
export default function Home() {
  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center m-12">
      <div className="grid space-y-10">
        <h1 className="font-titulos font-bold text-h1 text-center">Generador de tablas nutricionales</h1>
        <div className="px-24 py-9 bg-gris rounded-xl">
          <h3 className="font-titulos font-bold text-h3 text-center">Ingresa ingredientes a una base de datos de materias primas </h3>
        </div>
        <div className="px-24 py-9 bg-gris rounded-xl">
          <h3 className="font-titulos font-bold text-h3 text-center">Genera tablas nutricionales en varios formatos con solo un clic. </h3>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 items-center">
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-titulos font-bold text-h3 text-center">Registrate para comenzar</h3>
            <button className=" border font-parrafos text-p text-center text-blanco bg-negro-claro hover:bg-blanco hover:border-b-negro-claro hover:text-negro-claro py-4 px-6 rounded-xl mt-4">Registrarse</button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-titulos font-bold text-h3 text-center">Si ya tienes cuenta, inicia sesion</h3>
            <button className=" border font-parrafos text-p text-center text-blanco bg-negro-claro hover:bg-blanco hover:border-b-negro-claro hover:text-negro-claro py-4 px-6 rounded-xl mt-4">Iniciar Sesión</button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img className=""src="/imagenes/imagen_principal.png" alt="imagen principal"></img>
      </div>
    </div>
  );
}
