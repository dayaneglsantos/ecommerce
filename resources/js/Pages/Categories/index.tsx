import Card from '@/Components/Card';
import { GridContainer, GridItem } from '@/Components/Grid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CategoryType from '@/Types/CategoryType';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoriesPage() {
  const categories = usePage().props.categories as CategoryType[];

  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );

  const primaryCategories = categories.filter(
    (category: any) => !category.parent_id
  );

  console.log(categories);

  const handleSelectCategory = (category: CategoryType, level: number) => {
    const categories = selectedCategories.slice(0, level); // Pega todas as categorias até o nível selecionado
    categories[level] = category; // Coloca a categoria selecionada sendo a do nível atual
    setSelectedCategories(categories);
  };

  return (
    <AuthenticatedLayout>
      <Head title="Categorias" />

      <div className="mx-auto max-w-[95%] space-y-6 px-3 sm:px-6 lg:px-8 ">
        <div className="flex gap-2 h-[calc(100vh-130px)]">
          <Card className="w-64">
            <div className="flex flex-col gap-2">
              {primaryCategories.map((category) => (
                <div
                  className="rounded-md shadow-full p-1 cursor-pointer"
                  onClick={() => handleSelectCategory(category, 0)}
                >
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card
            className={`w-full flex gap-2 overflow-x-auto ${selectedCategories.length === 0 ? 'bg-gray-50' : ''}`}
          >
            {selectedCategories.map((category, index) => {
              const subs = category.subCategories || [];

              if (subs.length === 0)
                return (
                  <div className="flex justify-center items-center w-full bg-gray-50 min-w-[250px] text-center">
                    Nenhuma subcategoria para "{category.name}"
                  </div>
                );

              return (
                <Card className="border border-dashed border-primary-light w-[250px] shrink-0">
                  {subs?.map((sub) => (
                    <div
                      className={`p-1 rounded-md shadow-full mb-2 cursor-pointer`}
                      key={sub.id}
                      onClick={() => handleSelectCategory(sub, index + 1)}
                    >
                      {sub.name}
                    </div>
                  ))}
                </Card>
              );
            })}
            {selectedCategories.length === 0 && (
              <div className="flex items-center justify-center w-full text-gray-400 italic">
                Nenhuma categoria selecionada
              </div>
            )}
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
