import ProductImagesType from '@/Types/ProductImagesType';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { IoClose } from 'react-icons/io5';
import { CSS } from '@dnd-kit/utilities';

interface ReceivedImageType {
  file?: File;
  id?: number;
  uid?: string;
  preview?: string;
}

interface SortableImagesProps {
  images: ReceivedImageType[];
  handleDelete: (image: ReceivedImageType) => void;
  setImages: any;
  addImage?: () => void;
}

export default function SortableImages({
  images,
  handleDelete,
  setImages,
  addImage,
}: SortableImagesProps) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.uid === active.id);
    const newIndex = images.findIndex((img) => img.uid === over.id);

    const newImagesOrder = arrayMove(images, oldIndex, newIndex);
    setImages('images', newImagesOrder);
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
          <div
            className="col-span-2 relative shadow-full rounded-lg h-40 flex items-center justify-center border-2 border-dashed border-gray-300 text-[24px] text-gray-400 cursor-pointer"
            onClick={addImage}
          >
            +
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

// --------------------------------------

interface SortableImageItemProps {
  image: ReceivedImageType;
  handleDelete: (image: ReceivedImageType) => void;
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
        src={image.preview}
        alt="Imagem do produto"
        className="object-cover w-full h-full rounded-lg"
        {...listeners} // Eventos de drag and drop
      />
    </div>
  );
};
