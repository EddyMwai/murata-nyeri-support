
// Section navigation
const SECTIONS = ["Analytics", "Users", "Proverbs", "Support"];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const [loadingData, setLoadingData] = useState(true);

  // Loading skeletons
  const SkeletonCard = () => (
    <div className="murata-card rounded-xl shadow bg-white/80 p-6 flex flex-col items-center animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-8 w-16 bg-gray-200 rounded" />
    </div>
  );

  useEffect(() => {
    if (!user && !loading) navigate("/");
    if (profile?.role === "admin") setIsAdmin(true);
    else if (!loading) navigate("/");
  }, [user, profile, loading, navigate]);

  // Placeholder for data fetches
  useEffect(() => {
    if (!isAdmin) return;
    setLoadingData(false); // Set to true when real queries are added
  }, [isAdmin]);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  // Layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4 flex flex-col md:flex-row items-center justify-between bg-white/80 shadow">
        <h1 className="text-2xl font-bold text-primary mb-2 md:mb-0">Murata Admin Dashboard</h1>
        <nav className="flex gap-4 flex-wrap">
          {SECTIONS.map((section) => (
            <button
              key={section}
              className={`murata-back ${activeSection === section ? "bg-purple-600 text-white" : ""}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
          <button className="murata-back" onClick={handleLogout}>Logout</button>
        </nav>
        <button className="murata-back ml-4 mt-2 md:mt-0" onClick={() => navigate("/dashboard")}>Back to User Dashboard</button>
      </header>
      {/* Main Grid */}
      <main className="max-w-screen-xl mx-auto py-8 px-4 w-full flex-1">
        {/* Section Navigation */}
        <div className="mb-8 flex gap-4 flex-wrap justify-center md:justify-start">
          {SECTIONS.map((section) => (
            <button
              key={section}
              className={`murata-back ${activeSection === section ? "bg-purple-600 text-white" : ""}`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Section Content */}
        {activeSection === "Analytics" && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <div className="murata-card rounded-xl shadow bg-white/90 p-6 mb-8">Analytics charts will appear here.</div>
          </div>
        )}
        {activeSection === "Users" && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Users</h2>
            <div className="murata-card rounded-xl shadow bg-white/90 p-6 mb-8">Users table will appear here.</div>
          </div>
        )}
        {activeSection === "Proverbs" && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Proverbs Manager</h2>
            <div className="murata-card rounded-xl shadow bg-white/90 p-6 mb-8">Proverbs manager will appear here.</div>
          </div>
        )}
        {activeSection === "Support" && (
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">Support Requests</h2>
            <div className="murata-card rounded-xl shadow bg-white/90 p-6 mb-8">Support requests will appear here.</div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="w-full flex justify-center items-center py-4 bg-white/80 shadow-inner mt-4">
        <div className="text-primary font-medium">Murata Admin Panel — Empowering Recovery Through Data</div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
