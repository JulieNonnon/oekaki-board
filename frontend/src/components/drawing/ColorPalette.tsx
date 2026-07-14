// Rôle : afficher les couleurs et prévenir la fonction CreatePage() lorsqu'une couleur change

interface Props {
  title?: string;
  selectedColor: string;
  onChange: (color: string) => void;
}

export function ColorPalette({
  title,
  selectedColor,
  onChange
}: Props) {

const colors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#FFA500",
  "#FFFF00",
  "#00FF00",
  "#87CEFA",
  "#0000FF",
  "#800080",
  "#FF00FF",
];

return (
  <div>
    {colors.map((color) => (
      <button
        title={title || `Sélectionner la couleur ${color}`}
        key={color}
        onClick={() => onChange(color)}
        style={{
          backgroundColor: color,
          height: 30,
          width: 30,
          margin: 2,
          border:
            color === selectedColor
            ? "3px solid black"
            : "1px solid gray"
        }}
        
      />
    ))}
  </div>
);
}