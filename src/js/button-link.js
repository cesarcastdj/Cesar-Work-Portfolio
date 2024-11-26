const CV = document.getElementById("CV-Download");
const Repository = document.getElementById("Repository");

  // Función para cargar las URLs desde el archivo JSON
  async function fetchURLs() {
    try {
      const response = await fetch("../../src/config/button-links.json"); 
      if (!response.ok) throw new Error("Error: JSON no encontrado");
      const data = await response.json();

      // conviértelo a un objeto
      if (Array.isArray(data)) {
        return data[0]; // Asume que contiene las URLs
      }
      return data;
    } catch (error) {
      console.error("Error al cargar el JSON:", error);
      return null;
    }
  }

  // Función para abrir la URL correspondiente
  const openURL = async (key) => {
    const urls = await fetchURLs();

    if (urls && urls[key]) {
      window.open(urls[key], "_blank");
    } else {
      console.error(`No se encontró la URL para "${key}"`);
    }
  };

  // Asignar eventos a los botones
  CV.addEventListener("click", () => openURL("Link-Download-CV"));
  Repository.addEventListener("click", () => openURL("Link-Repoditory"));