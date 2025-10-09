-- Murata Support: Add chat, check-in, mood, and streaks tables

-- Messages table for chat functionality
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  role public.app_role NOT NULL DEFAULT 'user'
);

-- Check-ins table for daily user check-ins
CREATE TABLE public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_id UUID REFERENCES public.moods(id),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Moods table for mood selection
CREATE TABLE public.moods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  icon TEXT,
  color TEXT
);

-- Streaks table for tracking user check-in streaks
CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_checkin TIMESTAMP WITH TIME ZONE
);

-- Policies for new tables (basic: users can access their own data)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their messages" ON public.messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their checkins" ON public.checkins FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert checkins" ON public.checkins FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their streaks" ON public.streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their streaks" ON public.streaks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert streaks" ON public.streaks FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.moods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view moods" ON public.moods FOR SELECT USING (true);
CREATE POLICY "Admin can insert moods" ON public.moods FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin'));
