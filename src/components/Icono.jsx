// Componente para mostrar un ícono y texto alineados
export default function Icono({ icon, texto }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <span className="w-7 h-7 flex-shrink-0 mt-1" style={{ color: '#C47A59' }}>{icon}</span>
      <p className="text-sm sm:text-base md:text-lg text-gray-700">{texto}</p>
    </div>
  );
}
