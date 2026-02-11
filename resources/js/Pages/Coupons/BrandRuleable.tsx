import Badge from '@/Components/Badge';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import { GridContainer, GridItem } from '@/Components/Grid';
import InputLabel from '@/Components/InputLabel';
import BrandType from '@/Types/BrandType';
import CategoryType from '@/Types/CategoryType';
import ProductType from '@/Types/ProductType';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ca } from 'react-day-picker/locale';

interface BrandRuleableProps {
  setData: (field: string, value: any) => void;
  data: any;
  reset: () => void;
}

export default function BrandRuleable({
  setData,
  data,
  reset,
}: BrandRuleableProps) {
  const brands = usePage().props.brands as BrandType[];
  const categories = usePage().props.categories as CategoryType[];
  const products = usePage().props.products as ProductType[];

  const [hasExceptions, setHasExceptions] = useState(false);
  const [exceptionType, setExceptionType] = useState('');
  const [categoryExceptions, setCategoryExceptions] = useState<number[]>([]);
  const [hasCategoryExceptions, setHasCategoryExceptions] = useState(false);
  const [productExceptions, setProductExceptions] = useState<number[]>([]);

  const handleAddCategoryException = (id: number) => {
    const alreadySelected = categoryExceptions.includes(id);

    if (alreadySelected) {
      setCategoryExceptions(
        categoryExceptions.filter((exceptionId) => exceptionId !== id)
      );

      // Excluindo no formulário
      const filteredExceptions = data.items.filter(
        (item: any) =>
          !(item.ruleable.type === 'category' && item.ruleable.id === id)
      );

      setData('items', filteredExceptions);
    } else {
      setCategoryExceptions([...categoryExceptions, id]);

      // Incluindo no formulário
      setData('items', [
        ...data.items,
        {
          ruleable: {
            type: 'category',
            id,
          },
          condition: 'exclude',
        },
      ]);
    }
  };

  const handleAddProduct = (id: number, condition: 'include' | 'exclude') => {
    const alreadySelected = productExceptions.includes(id);

    if (alreadySelected) {
      setProductExceptions(
        productExceptions.filter((exceptionId) => exceptionId !== id)
      );

      // Excluindo no formulário
      const filteredExceptions = data.items.filter(
        (item: any) =>
          !(item.ruleable.type === 'product' && item.ruleable.id === id)
      );

      setData('items', filteredExceptions);
    } else {
      setProductExceptions([...productExceptions, id]);

      // Incluindo no formulário
      setData('items', [
        ...data.items,
        {
          ruleable: {
            type: 'product',
            id,
          },
          condition: condition,
        },
      ]);
    }
  };

  return (
    <div>
      <GridContainer className="my-4 max-h-[280px] overflow-y-auto">
        {brands.map((brand) => (
          <GridItem size={4}>
            <Card
              className={`flex gap-3 items-center w-full cursor-pointer ${data.items[0]?.ruleable.id === brand.id ? 'bg-primary-light' : ''}`}
              onClick={() => setData(`items.0.ruleable.id`, brand.id)}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-12 h-12 rounded-lg"
              />
              <span>{brand.name}</span>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
      {/* Selecionado o item de inclusão - pergunta se haverá exceções */}
      {data.items[0]?.ruleable.id && (
        <>
          <p className="text-gray-700">
            Cupom será aplicado para todos os produtos da marca selecionada?
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasExceptions(false);
                }}
                checked={!hasExceptions}
              />
              <InputLabel value="Sim" />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasExceptions(true);
                }}
                checked={hasExceptions}
              />
              <InputLabel value="Não" />
            </div>
          </div>
        </>
      )}

      {/* Seleciona o tipo de exceção (caso haja) */}
      {hasExceptions && (
        <div className="my-6">
          <InputLabel className="mt-2" value="Selecione qual será a exceção:" />
          <div className="flex gap-3 mt-2">
            <button onClick={() => setExceptionType('category')} type="button">
              <Badge
                className="cursor-pointer font-bold"
                type={exceptionType === 'category' ? 'warning' : 'default'}
              >
                Categorias
              </Badge>
            </button>
            <button onClick={() => setExceptionType('product')} type="button">
              <Badge
                className="cursor-pointer font-bold"
                type={exceptionType === 'product' ? 'warning' : 'default'}
              >
                Produto
              </Badge>
            </button>
          </div>
        </div>
      )}

      {/* ==================== Exclusão de produto ====================*/}
      {exceptionType === 'product' && (
        <GridContainer>
          {products.map((product) => (
            <GridItem size={3}>
              <Card
                className={`flex items-center w-full text-sm cursor-pointer ${productExceptions.includes(product.id) ? 'bg-primary-light' : ''}`}
                onClick={() => handleAddProduct(product.id, 'exclude')}
              >
                <img
                  src={product?.images[0]?.url}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg"
                />
                <span>{product.name}</span>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      )}
      {/* ==================== FIM - Exclusão de produto ====================*/}

      {/* ==================== Exclusão de categorias ====================*/}
      {exceptionType === 'category' && (
        <GridContainer>
          {categories.map((category) => (
            <GridItem size={3}>
              <Card
                className={`w-full text-sm cursor-pointer ${categoryExceptions.includes(category.id) ? 'bg-primary-light' : ''}`}
                onClick={() => handleAddCategoryException(category.id)}
              >
                <p
                  className="whitespace-nowrap overflow-hidden text-ellipsis"
                  title={category.name}
                >
                  {category.name}
                </p>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      )}

      {categoryExceptions.length > 0 && (
        <div className="my-6">
          <p>
            Todos os produtos das categorias selecionadas serão excluídos do
            cupom?
          </p>
          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasCategoryExceptions(false);
                }}
                checked={!hasCategoryExceptions}
              />
              <InputLabel value="Sim" />
            </div>
            <div className="flex items-center gap-1">
              <Checkbox
                onChange={(e) => {
                  setHasCategoryExceptions(true);
                }}
                checked={hasCategoryExceptions}
              />
              <InputLabel value="Não" />
            </div>
          </div>
        </div>
      )}
      {/* ==================== FIM - Exclusão de categorias ====================*/}

      {/* ==================== Reinclusão de produtos quando houver exceção de categoria ====================*/}
      {exceptionType === 'category' &&
        hasCategoryExceptions &&
        categoryExceptions.length > 0 && (
          <GridContainer>
            {products.map((product) => (
              <GridItem size={3}>
                <Card
                  className={`w-full text-sm cursor-pointer ${productExceptions.includes(product.id) ? 'bg-primary-light' : ''}`}
                  onClick={() => handleAddProduct(product.id, 'include')}
                >
                  <span>{product.name}</span>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
        )}
      {/* ==================== FIM - Reinclusão de produtos quando houver exceção de categoria ====================*/}
    </div>
  );
}
