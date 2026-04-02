// home page

export default async function Home() {
  const res = await fetch("http://localhost:4000");

  const text = await res.text();

  return <div>{text}</div>;
}