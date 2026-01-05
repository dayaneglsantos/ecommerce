import defaultAvatar from '@/assets/default_avatar.png';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  src: string | null;
  className?: string;
  [key: string]: any;
}

export default function Avatar({
  size = 'lg',
  src,
  className = '',
  ...props
}: AvatarProps) {
  return (
    <img
      {...props}
      src={src || defaultAvatar}
      alt="Imagem do perfil"
      className={
        `rounded-full object-cover  ${
          size === 'sm'
            ? 'w-8 h-8'
            : size === 'md'
            ? 'w-16 h-16'
            : size === 'lg'
            ? 'w-24 h-24'
            : ''
        } ` + className
      }
    />
  );
}
