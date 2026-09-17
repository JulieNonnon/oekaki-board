// Utilitaire utilisé par la page create: Activer le bouton de sauvegarde seulement si le titre est rempli et qu'on a dessiné quelque chose.

export const canSaveDrawing = (
  title: string,
  hasDrawn: boolean
) => {
  return title.trim().length > 0 && hasDrawn;
};
