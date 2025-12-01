import { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import creditCard from '@/assets/credit_card.png';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';

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

  const stripeKey = import.meta.env.VITE_STRIPE_KEY;
  const stripePromise = loadStripe(stripeKey);

  useEffect(() => {
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
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar os dados do cartão para o backend
    if (!strapi || !elements) return;
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
        <PrimaryButton>Salvar</PrimaryButton>
      </form>
    </section>
  );
}
