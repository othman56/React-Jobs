import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layouts/MainLayout";
import JobsPage from "./Pages/JobsPage";
import NotFound from "./Pages/NotFound";
import JobPage, { jobLoader } from "./Pages/JobPage";
import AddJobPage from "./Pages/AddJobPage";

const App = () => {
  // Add Job
  const handleAddJobSubmit = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const handleDeleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
    console.log("delete job", id);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/add-job"
          element={<AddJobPage handleAddJobSubmit={handleAddJobSubmit} />}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage handleDeleteJob={handleDeleteJob} />}
          loader={jobLoader}
        />
        <Route path="/*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
