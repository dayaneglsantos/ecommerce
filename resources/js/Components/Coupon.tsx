import Badge from './Badge';

export default function Coupon() {
  return (
    <div className="relative p-3 border-dashed border-2 w-80 h-[210px] bg-white">
      <div className="absolute top-[5px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>
      <div className="absolute top-[25px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>
      <div className="absolute top-[45px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>
      <div className="absolute top-[65px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>
      <div className="absolute top-[85px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>
      <div className="absolute top-[105px] -left-1.5 w-3 h-3 bg-white rotate-45 border-r-2 border-t-2 border-dashed "></div>

      <div className="absolute top-[5px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>
      <div className="absolute top-[25px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>
      <div className="absolute top-[45px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>
      <div className="absolute top-[65px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>
      <div className="absolute top-[85px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>
      <div className="absolute top-[105px] -right-1.5 w-3 h-3 bg-white rotate-45 border-l-2 border-b-2 border-dashed "></div>

      <div className="text-center text-primary-dark font-medium">BEMVINDO</div>
      <div className="text-sm text-gray-400 text-center">
        <span>De 00/00/0000 15:30 até 00/00/00 14:30</span>
        <p>Desconto: R$ 50,00</p>
        <p>Pedido mínimo: R$ 150,00</p>
        <p>Quantidade por usuário: 1</p>
        <Badge type="success" className="my-2">
          Disponíveis: 40
        </Badge>

        <div className="pt-4 border-dashed border-t-2">
          <button className="w-full py-1.5 bg-gray-100 rounded-2xl">
            Ver regras
          </button>
        </div>
      </div>
    </div>
  );
}
