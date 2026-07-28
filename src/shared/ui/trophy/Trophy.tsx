interface Props{
    count: number;
    category: CategoryType;
    type: 'driver' | 'constructor';
}

// Importa tus imágenes (ajusta las rutas según tu proyecto)
import f1ChampionTrophy from '@shared/assets/icons/f1_driver_champion.png';
import f1ConstructorTrophy from '@shared/assets/icons/f1_constructor_champion.png';
import f3ChampionTrophy from '@shared/assets/icons/f3_driver_champion.png';
import f3ConstructorTrophy from '@shared/assets/icons/f3_constructor_champion.png';
import wecChampionTrophy from '@shared/assets/icons/wec_driver_champion.png';
import { CategoryType } from '@/entities/categories';

const championTrophyMap: Partial<Record<CategoryType, string>> = {
  [CategoryType.F1]: f1ChampionTrophy,
  [CategoryType.WEC]: wecChampionTrophy, // Assuming WEC uses the same champion trophy as F1
  [CategoryType.F3]: f3ChampionTrophy
};

const constructorTrophyMap: Partial<Record<CategoryType, string>> = {
  [CategoryType.F1]: f1ConstructorTrophy,
  [CategoryType.WEC]: f1ConstructorTrophy, // Assuming WEC uses the same constructor trophy as F1
  [CategoryType.F3]: f3ConstructorTrophy
};

export function Trophy({ count, category, type }: Props){
    if (count <= 0) return null;

  const imageSrc = type === 'driver' 
    ? championTrophyMap[category] 
    : constructorTrophyMap[category];
  
  const label = type === 'driver' ? 'Pilotos' : 'Constructores';

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={`${type}-${category}-${i}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <img
            src={imageSrc}
            alt={`${label} Champion`}
            style={{
              width: 48,
              height: 68,
              objectFit: 'contain',
              ...(type === 'constructor' && { marginBottom: '4px' }), // si quieres mantener ese margen extra
            }}
          />
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '8px',
              fontWeight: 700,
              color: 'var(--text-3)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            ({category}) {label}
          </span>
        </div>
      ))}
    </>
  );
}