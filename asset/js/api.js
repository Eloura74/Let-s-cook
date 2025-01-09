export default class Api {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);

      // Vérifier si la réponse est valide
      if (!response.ok) {
        throw new Error(
          `Erreur ${response.status}: Impossible de trouver les données`
        );
      }

      // Convertir la réponse en JSON
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      throw error;
    }
  }
}
