import { useEffect, useState } from "react";


function StudentDashboard() {

    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs,setJobs]=useState([]);
  const [applications,setApplications]=useState([]);


  useEffect(()=>{
    const fetchApplications= async()=>{
      try{
        const token=localStorage.getItem("token");
        const response=await fetch("http://localhost:5000/api/job/job:Id/my-applications",{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
           )
          const data= await response.json();

          if(!response.ok()){
            console.log(data.message);
            return
          }
          setApplications(data.applications);

        }catch(error){
          console.error(error)

        }
     
      }
    },[]);
    



  useEffect(()=>{
    const fetchJobs=async()=>{
      try{
        const token= localStorage.getItem("token");

        const response= await fetch(
          "http://localhost:5000/api/jobs",{
            headers:{
              Authorization:`Bearer ${token}`
            },
          }
        );
        const data=await response.json();

        if(!response.json){
          console.error(data.message)
        }
        setJobs(data.jobs)
        console.log("Fetched jobs:", data.jobs);
      }catch(error){
        console.error("Jobs fetch error:", error);
      }
    }
    fetchJobs();
  },[])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

    
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">

        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            Place<span className="text-blue-500">Sync</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Student Portal
          </p>
        </div>

        <nav className="space-y-2">

          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left">
            Dashboard
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
            Jobs
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
            Applications
          </button>

          <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
            Profile
          </button>

        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
            Logout
          </button>
        </div>

      </aside>


      {/* Main content */}
      <main className="ml-64 p-8">

        {/* Header */}
        <header className="mb-10 flex items-center justify-between">

          <div>
            <p className="text-sm text-slate-500">
              Student Dashboard
            </p>

            <h2 className="mt-1 text-3xl font-bold">
  Good morning{user ? `, ${user.name}` : ""} 👋
</h2>

            <p className="mt-2 text-slate-400">
              Here's what's happening with your placement journey.
            </p>
          </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-semibold">
  {user?.name?.charAt(0).toUpperCase() || "?"}
</div>
        </header>


        {/* Stats */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Eligible Jobs
            </p>
          <h3 className="mt-3 text-3xl font-bold">
            {jobs.length}
          </h3>
            
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Applications
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              4
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Shortlisted
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              2
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Interviews
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              1
            </h3>
          </div>

        </section>


        {/* Dashboard content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recommended jobs */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Recommended Jobs
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Opportunities matching your profile
                </p>
              </div>

              <button className="text-sm text-blue-400 hover:text-blue-300">
                View all
              </button>
            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl border border-slate-800 p-5 hover:bg-slate-800/50">

                <div className="flex items-start justify-between">

                  <div>
                    <h4 className="font-semibold">
                      Software Engineer
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Example Technologies
                    </p>

                    <div className="mt-3 flex gap-3 text-xs text-slate-500">
                      <span>Hyderabad</span>
                      <span>•</span>
                      <span>Full-time</span>
                      <span>•</span>
                      <span>₹8–12 LPA</span>
                    </div>
                  </div>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
                    View Job
                  </button>

                </div>

              </div>

              <div className="rounded-xl border border-slate-800 p-5 hover:bg-slate-800/50">

                <div className="flex items-start justify-between">

                  <div>
                    <h4 className="font-semibold">
                      Frontend Developer
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Example Software
                    </p>

                    <div className="mt-3 flex gap-3 text-xs text-slate-500">
                      <span>Bangalore</span>
                      <span>•</span>
                      <span>Full-time</span>
                      <span>•</span>
                      <span>₹6–10 LPA</span>
                    </div>
                  </div>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
                    View Job
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* Applications */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">
              Recent Applications
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="font-medium">
                  Frontend Developer
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Example Software
                </p>

                <span className="mt-3 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  Shortlisted
                </span>
              </div>

              <div>
                <p className="font-medium">
                  Software Engineer
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Example Technologies
                </p>

                <span className="mt-3 inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                  Under Review
                </span>
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;