// liste des dessins

//import { getDrawings } from "@/services/drawings";

export default async function DrawingsPage() {
  //const data = await getDrawings();

  return (
    <div>
      <h1>Drawings</h1>

      {/* {data.data.map((drawing : any) => (
        <div key={drawing.id}>
          <img src={drawing.imageUrl} width={200} />
          <p>{drawing.title}</p>
        </div>
      ))} */}
    </div>
  );
}