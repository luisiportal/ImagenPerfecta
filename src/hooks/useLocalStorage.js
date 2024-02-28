export function useLocalStorage(){
    try {
       
        localStorage.setItem("productosDB", JSON.stringify(productos));
      } catch (error) {
        console.error(error);
      }

}