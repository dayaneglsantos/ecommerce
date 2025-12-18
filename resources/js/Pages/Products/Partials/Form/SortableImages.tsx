import ProductImagesType from '@/Types/ProductImagesType';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { IoClose } from 'react-icons/io5';
import { CSS } from '@dnd-kit/utilities';

interface SortableImagesProps {
  images: ProductImagesType[];
  handleDelete: (image: ProductImagesType) => void;
  setImages: React.Dispatch<React.SetStateAction<any>>;
}

export default function SortableImages({
  images,
  handleDelete,
  setImages,
}: SortableImagesProps) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.uid === active.id);
    const newIndex = images.findIndex((img) => img.uid === over.id);

    setImages((items: ProductImagesType[]) => {
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={images.map((image) => image.uid!)}>
        <div className="grid grid-cols-6 gap-3 my-5">
          {images.map((image, index) => (
            <SortableImageItem
              key={image.uid}
              image={image}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// --------------------------------------

interface SortableImageItemProps {
  image: ProductImagesType;
  handleDelete: (image: ProductImagesType) => void;
}

const SortableImageItem = ({ image, handleDelete }: SortableImageItemProps) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: image.uid! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="col-span-2 relative shadow-full rounded-lg h-40"
      style={style} // Aplica a transformação e transição para o drag and drop
      ref={setNodeRef} // Conecta o elemento ao sistema de drag and drop
      {...attributes} // Atributos de acessibilidade
    >
      <IoClose
        className="absolute -top-2 -right-2 cursor-pointer text-red-600 p-1 bg-gray-200 rounded-full text-2xl"
        onClick={() => handleDelete(image)}
      />
      <img
        src={image.url || image.path}
        alt="Imagem do produto"
        className="object-cover w-full h-full rounded-lg"
        {...listeners} // Eventos de drag and drop
      />
    </div>
  );
};
