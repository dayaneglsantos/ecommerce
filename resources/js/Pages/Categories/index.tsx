import Card from '@/Components/Card';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { GridContainer, GridItem } from '@/Components/Grid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CategoryType from '@/Types/CategoryType';
import {
  Dialog,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { SlOptionsVertical } from 'react-icons/sl';
import CategoryFormModal from './CategoryFormModal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CategoriesPage() {
  const categories = usePage().props.categories as CategoryType[];

  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoryType | null>(null);

  const primaryCategories = categories.filter(
    (category: any) => !category.parent_id
  );

  // Seleciona uma categoria e atualiza a lista de categorias selecionadas
  const handleSelectCategory = (category: CategoryType, level: number) => {
    const categories = selectedCategories.slice(0, level); // Pega todas as categorias até o nível selecionado
    categories[level] = category; // Coloca a categoria selecionada sendo a do nível atual
    setSelectedCategories(categories);
  };

  const handleDeleteCategory = () => {
    if (!selectedItem) return;

    router.delete(route('categories.destroy', selectedItem.id), {
      onSuccess: () => {
        setSelectedCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== selectedItem.id)
        );
        setSelectedItem(null);
      },
    });
  };

  // =========== Atualiza a lista de categorias selecionadas quando a lista global de categorias muda ==========
  useEffect(() => {
    // Função para encontrar a categoria atualizada dentro da árvore
    const findCategory = (
      list: CategoryType[],
      id: number
    ): CategoryType | null => {
      for (const cat of list) {
        if (cat.id === id) return cat;
        if (cat.subCategories) {
          const found = findCategory(cat.subCategories, id);
          if (found) return found;
        }
      }
      return null;
    };

    const newPath: CategoryType[] = []; // Nova lista de categorias selecionadas
    let currentList = categories; // Começa com a lista completa de categorias principais

    // Reconstrói o caminho das categorias selecionadas
    for (const selected of selectedCategories) {
      const updated = findCategory(currentList, selected.id);
      if (updated) {
        newPath.push(updated);
        currentList = updated.subCategories || []; // Atualiza a lista atual para as subcategorias da categoria atualizada
      } else {
        // Se uma categoria não for encontrada (foi deletada), então paramos e não adicionamos mais nada
        break;
      }
    }

    setSelectedCategories(newPath);
  }, [categories]); // Dispara sempre que a lista global do servidor mudar

  console.log('selected categories', selectedCategories);
  console.log('categories', categories);

  return (
    <AuthenticatedLayout>
      <Head title="Categorias" />

      <div className="mx-auto max-w-[95%] space-y-6 px-3 sm:px-6 lg:px-8 ">
        <div className="flex justify-end">
          <PrimaryButton onClick={() => setOpenFormModal(true)}>
            Nova categoria
          </PrimaryButton>
        </div>
        <div className="flex gap-2 h-[calc(100vh-130px)]">
          <Card className="!w-64">
            <div className="flex flex-col gap-2">
              {primaryCategories.map((category) => (
                <div
                  className="rounded-md shadow-full p-1 cursor-pointer flex justify-between items-center"
                  onClick={() => handleSelectCategory(category, 0)}
                >
                  <span>{category.name}</span>
                  <Menu as="div">
                    <MenuButton
                      className="focus:outline-none p-1 rounded-full bg-gray-50 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <SlOptionsVertical className="text-sm" />
                    </MenuButton>
                    <MenuItems
                      transition
                      anchor="bottom end"
                      className="w-20 bg-gray-100 rounded-xl p-1 focus:outline-none shadow-full border border-gray-200"
                    >
                      <MenuItem>
                        <button
                          className="flex items-center justify-between gap-2 p-1 hover:bg-gray-200 rounded-md w-full"
                          onClick={() => {
                            setSelectedItem(category);
                            setOpenFormModal(true);
                          }}
                        >
                          <span className="text-sm">Editar</span>{' '}
                          <FaPencilAlt className="text-xs" />
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          className="flex items-center justify-between gap-2 p-1 hover:bg-gray-200 rounded-md w-full"
                          onClick={() => {
                            setSelectedItem(category);
                            setOpenConfirmDialog(true);
                          }}
                        >
                          <span className="text-sm">Excluir</span>{' '}
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
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
                <Card className="flex flex-col gap-2 border border-dashed border-primary-light w-[250px] shrink-0 ">
                  {subs?.map((sub) => {
                    return (
                      <div className="flex justify-between items-center gap-2 p-1 rounded-md shadow-full cursor-pointer !relative">
                        <div
                          key={sub.id}
                          onClick={() => handleSelectCategory(sub, index + 1)}
                        >
                          {sub.name}
                        </div>
                        <Menu as="div" className="p-1">
                          <MenuButton
                            className="focus:outline-none"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <SlOptionsVertical className="text-sm" />
                          </MenuButton>
                          <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-20 bg-gray-100 rounded-xl p-1 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                          >
                            <MenuItem>
                              <button
                                className="flex items-center justify-between gap-2 p-1 hover:bg-gray-200 rounded-md w-full"
                                onClick={() => {
                                  setSelectedItem(sub);
                                  setOpenFormModal(true);
                                }}
                              >
                                <span className="text-sm">Editar</span>{' '}
                                <FaPencilAlt className="text-sm" />
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <button
                                className="flex items-center justify-between gap-2 p-1 hover:bg-gray-200 rounded-md w-full"
                                onClick={() => {
                                  setSelectedItem(sub);
                                  setOpenConfirmDialog(true);
                                }}
                              >
                                <span className="text-sm">Excluir</span>{' '}
                                <FaTrashAlt className="text-sm" />
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>
                    );
                  })}
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
      <CategoryFormModal
        open={openFormModal}
        onClose={() => {
          setOpenFormModal(false);
          setSelectedItem(null);
        }}
        category={selectedItem}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        title="Tem certeza que deseja remover essa categoria?"
        description="Todas as subcategorias vinculadas a esta também serão removidas."
        onAccept={() => {
          setOpenConfirmDialog(false);
          handleDeleteCategory();
        }}
        onClose={() => {
          setOpenConfirmDialog(false);
          setSelectedItem(null);
        }}
      />
    </AuthenticatedLayout>
  );
}
