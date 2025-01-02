export async function GET() {
  const tasks = [
    { id: "1", name: "Learn React", completed: false },
    { id: "2", name: "Learn Zustand", completed: false },
    { id: "3", name: "Build To-Do App", completed: false },
  ];

  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
