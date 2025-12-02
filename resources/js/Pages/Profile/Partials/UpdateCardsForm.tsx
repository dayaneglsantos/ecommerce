import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import creditCard from '@/assets/credit_card.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import Card from '@/Components/Card';
import { FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import ConfirmDialog from '@/Components/ConfirmDialog';

interface UpdateProfileInformationProps {
  status: string | null;
  className?: string;
  user: any;
}

export default function UpdateCards({
  status,
  className = '',
  user,
}: UpdateProfileInformationProps) {
  const cardNumberRef = useRef<HTMLDivElement | null>(null);
  const cardExpiryRef = useRef<HTMLDivElement | null>(null);
  const cardCvcRef = useRef<HTMLDivElement | null>(null);

  const [strapi, setStrapi] = useState<any>(null);
  const [elements, setElements] = useState<any>(null);
  const [numbererror, setNumberError] = useState<string | null>(null);
  const [expiryerror, setExpiryError] = useState<string | null>(null);
  const [cvcerror, setCvcError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(
    user.cards.length === 0 ? true : false
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const stripeKey = import.meta.env.VITE_STRIPE_KEY;
  const stripePromise = loadStripe(stripeKey);

  useEffect(() => {
    if (!isEditing) return;
    stripePromise.then((stripe) => {
      if (!stripe) return;
      setStrapi(stripe);
      const elements = stripe.elements();
      setElements(elements);

      const cardNumberElement = elements.create('cardNumber');
      const cardExpiryElement = elements.create('cardExpiry');
      const cardCvcElement = elements.create('cardCvc');
      cardExpiryElement.mount(cardExpiryRef.current!);
      cardCvcElement.mount(cardCvcRef.current!);
      cardNumberElement.mount(cardNumberRef.current!);
      cardNumberElement.on('change', (event: any) => {
        setNumberError(event.error ? event.error.message : null);
      });
      cardCvcElement.on('change', (event: any) => {
        setCvcError(event.error ? event.error.message : null);
      });
      cardExpiryElement.on('change', (event: any) => {
        setExpiryError(event.error ? event.error.message : null);
      });
    });
  }, [isEditing]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!strapi || !elements) return;

    const cardElement = elements.getElement('cardNumber');

    const { paymentMethod, error } = await strapi.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
      return;
    }

    if (paymentMethod) {
      elements.getElement('cardNumber').clear();
      elements.getElement('cardExpiry').clear();
      elements.getElement('cardCvc').clear();
    }

    // Enviar para o backend via Inertia
    router.post(
      route('payment-methods.store'),
      {
        payment_method: paymentMethod.id,
      },
      { preserveScroll: true }
    );
  };

  const handleDeteteCard = (cardId: string) => {
    router.delete(route('cards.destroy', cardId));
  };

  return (
    <section className={className}>
      <header className="flex items-center gap-6">
        <img src={creditCard} alt="Credit Card" className="w-24" />
        <div>
          <h2 className="text-lg font-medium text-gray-900">Cartões</h2>

          <p className="mt-1 text-sm text-gray-600">Atualize seus cartões.</p>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-4">
        {user.cards.length > 0 &&
          user.cards.map((card: any) => (
            <Card className="relative pt-12 mt-6 col-span-2 w-full">
              <div
                className={`absolute top-4 left-4 border border-primary p-1 text-[12px] rounded-full px-2 text-primaryDark  ${
                  card.is_default ? 'bg-gray-200' : 'bg-gray-50 '
                }`}
              >
                <button type="button" onClick={() => {}}>
                  {card.is_default ? 'Cartão Padrão' : 'Definir como padrão'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCardId(card.id);
                  setOpenConfirmDialog(true);
                }}
              >
                <FaTrashAlt
                  data-tooltip-id="delete"
                  className={`cursor-pointer text-gray-500 outline-none absolute top-4 right-4 hover:text-red-600`}
                />
                <Tooltip
                  id="delete"
                  place="top"
                  content="Excluir"
                  className="!p-2 !text-[12px]"
                />
              </button>
              <p>
                Últimos quatro dígitos: <strong>{card.last_four}</strong>
              </p>
              <p>
                Expira no mês: <strong>{card.expiration_month}</strong>
              </p>
            </Card>
          ))}
      </div>
      {isEditing && (
        <form onSubmit={submit} autoComplete="off">
          <div className="grid grid-cols-6 gap-4 mb-3">
            <div className="col-span-3">
              <div
                ref={cardNumberRef}
                className=" p-3 border border-gray-300 rounded-md shadow-sm mt-3"
              ></div>
              {numbererror && <div className="text-red-500">{numbererror}</div>}
            </div>
            <div className="col-span-2">
              <div
                ref={cardExpiryRef}
                className=" p-3 border border-gray-300 rounded-md shadow-sm mt-3"
              ></div>
              {expiryerror && <div className="text-red-500">{expiryerror}</div>}
            </div>
            <div className="col-span-1">
              <div
                ref={cardCvcRef}
                className=" p-3 border border-gray-300 rounded-md shadow-sm mt-3"
              ></div>
              {cvcerror && <div className="text-red-500">{cvcerror}</div>}
            </div>
          </div>
          <PrimaryButton type="submit">Salvar</PrimaryButton>
        </form>
      )}

      <button
        type="button"
        className={`w-full p-2 border border-dashed border-gray-400 rounded-2xl mt-6 text-center text-gray-500 font-bold ${
          isEditing ? 'opacity-50' : 'cursor-pointer hover:bg-gray-100'
        }`}
        disabled={isEditing}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Adicionar novo cartão
      </button>
      <ConfirmDialog
        open={openConfirmDialog}
        title="Tem certeza que deseja remover este cartão?"
        onAccept={() => {
          selectedCardId && handleDeteteCard(selectedCardId);
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedCardId(null);
        }}
      />
    </section>
  );
}
