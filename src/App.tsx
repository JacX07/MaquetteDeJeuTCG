import { useMemo, useState } from 'react';

type Element = 'Feu' | 'Nature' | 'Éther' | 'Ombre' | 'Givre';

type Card = {
  id: number;
  name: string;
  subtitle: string;
  element: Element;
  cost: number;
  attack: number;
  defense: number;
  rarity: 'Commune' | 'Rare' | 'Épique' | 'Légendaire';
  description: string;
  quote: string;
  set: string;
};

const cards: Card[] = [
  {
    id: 1,
    name: 'Aelyra',
    subtitle: 'Gardienne des braises',
    element: 'Feu',
    cost: 5,
    attack: 7,
    defense: 5,
    rarity: 'Légendaire',
    description:
      'À son arrivée, infligez 2 dégâts à chaque créature adverse. Vos sorts de feu coûtent 1 de moins.',
    quote: '« Une étincelle suffit pour réécrire le destin. »',
    set: 'Origines I · 001/120',
  },
  {
    id: 2,
    name: 'Cerf d’Émeraude',
    subtitle: 'Esprit des clairières',
    element: 'Nature',
    cost: 3,
    attack: 4,
    defense: 6,
    rarity: 'Épique',
    description:
      'Quand vous gagnez des points de vie, cette créature gagne +1 en attaque jusqu’à la fin du tour.',
    quote: '« La forêt n’oublie aucun pas. »',
    set: 'Origines I · 018/120',
  },
  {
    id: 3,
    name: 'Oracle d’Azur',
    subtitle: 'Tisseuse de possibles',
    element: 'Éther',
    cost: 4,
    attack: 3,
    defense: 5,
    rarity: 'Rare',
    description:
      'Regardez les trois premières cartes de votre deck. Ajoutez-en une à votre main et replacez les autres.',
    quote: '« Demain est un miroir que je peux incliner. »',
    set: 'Origines I · 037/120',
  },
  {
    id: 4,
    name: 'Traque-nuit',
    subtitle: 'Prédateur silencieux',
    element: 'Ombre',
    cost: 2,
    attack: 5,
    defense: 2,
    rarity: 'Rare',
    description:
      'Furtivité. Lorsque cette créature attaque seule, elle gagne +2 en attaque.',
    quote: '« Vous entendrez le vent. Rien de plus. »',
    set: 'Origines I · 052/120',
  },
  {
    id: 5,
    name: 'Titan de Givre',
    subtitle: 'Colosse des cimes',
    element: 'Givre',
    cost: 7,
    attack: 8,
    defense: 9,
    rarity: 'Épique',
    description:
      'Les créatures qui bloquent le Titan de Givre ne se redressent pas au prochain tour.',
    quote: '« La montagne s’éveilla. Le monde se tut. »',
    set: 'Origines I · 071/120',
  },
  {
    id: 6,
    name: 'Renard Solaire',
    subtitle: 'Messager de l’aube',
    element: 'Feu',
    cost: 1,
    attack: 2,
    defense: 2,
    rarity: 'Commune',
    description:
      'Célérité. Quand le Renard Solaire quitte le jeu, piochez une carte.',
    quote: '« Il court là où la lumière hésite. »',
    set: 'Origines I · 009/120',
  },
];

const elementStyles: Record<Element, { color: string; glow: string; symbol: string }> = {
  Feu: { color: '#e96c42', glow: '#fa9a5c', symbol: '◆' },
  Nature: { color: '#6fa77b', glow: '#b0d17e', symbol: '✦' },
  Éther: { color: '#728fd0', glow: '#a7baf0', symbol: '◈' },
  Ombre: { color: '#8b6da9', glow: '#bb8fc7', symbol: '●' },
  Givre: { color: '#72aebe', glow: '#b1e2df', symbol: '✧' },
};

function Icon({
  name,
  size = 18,
}: {
  name: 'search' | 'grid' | 'rows' | 'heart' | 'plus' | 'minus' | 'cards';
  size?: number;
}) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    rows: <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    cards: <><rect x="6" y="3" width="13" height="17" rx="2" /><path d="m6 7-2 .5A2 2 0 0 0 2.5 10l2.7 10.5" /><path d="M10 8h5M10 12h5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function CardArt({ card, large = false }: { card: Card; large?: boolean }) {
  const style = elementStyles[card.element];
  return (
    <div
      className={`card-art art-${card.id} ${large ? 'card-art-large' : ''}`}
      style={{ '--element': style.color, '--glow': style.glow } as React.CSSProperties}
    >
      <div className="art-moon" />
      <div className="art-horizon" />
      <div className="art-figure">
        <span />
      </div>
      <div className="art-grain" />
    </div>
  );
}

function GameCard({
  card,
  selected,
  onSelect,
}: {
  card: Card;
  selected: boolean;
  onSelect: () => void;
}) {
  const style = elementStyles[card.element];
  return (
    <button
      className={`game-card ${selected ? 'selected' : ''}`}
      onClick={onSelect}
      aria-label={`Voir ${card.name}`}
      data-rarity={card.rarity}
      style={{ '--element': style.color } as React.CSSProperties}
    >
      <div className="card-topline">
        <span className="card-cost">{card.cost}</span>
        <span className="card-element">{style.symbol}</span>
      </div>
      <CardArt card={card} />
      <div className="card-copy">
        <span className="card-rarity">{card.rarity}</span>
        <h3>{card.name}</h3>
        <p>{card.subtitle}</p>
      </div>
      <div className="card-stats">
        <span><b>{card.attack}</b> ATQ</span>
        <i />
        <span><b>{card.defense}</b> DEF</span>
      </div>
    </button>
  );
}

type Page =
  | 'home'
  | 'collection'
  | 'inventory'
  | 'team'
  | 'quests'
  | 'market'
  | 'ranking'
  | 'settings'
  | 'profile'
  | 'story'
  | 'dungeons'
  | 'raids'
  | 'expeditions'
  | 'pvp'
  | 'live'
  | 'tower';

const playModes = [
  { id: 'story', title: 'Mode histoire', tag: 'Campagne', description: 'Traversez les royaumes et dévoilez les origines de la Faille.', symbol: '◇' },
  { id: 'dungeons', title: 'Donjons', tag: '1–3 joueurs', description: 'Affrontez des gardiens et récupérez des reliques rares.', symbol: '⌁' },
  { id: 'raids', title: 'Raids', tag: 'Coopération', description: 'Unissez vos forces face aux Titans primordiaux.', symbol: '△' },
  { id: 'expeditions', title: 'Expéditions', tag: 'Exploration', description: 'Envoyez vos squads à la recherche de ressources.', symbol: '✦' },
  { id: 'pvp', title: 'Arène PvP', tag: 'Classé', description: 'Mesurez votre deck aux invocateurs du monde entier.', symbol: '×' },
  { id: 'live', title: 'Arène Live', tag: 'Temps réel', description: 'Des duels directs où chaque décision compte.', symbol: '◉' },
  { id: 'tower', title: 'Tour universelle', tag: 'Endgame', description: 'Gravissez cent étages aux règles changeantes.', symbol: '▥' },
] as const;

const pageNames: Partial<Record<Page, { eyebrow: string; title: string; description: string }>> = {
  inventory: { eyebrow: 'RÉSERVES DE LA CITADELLE', title: 'Inventaire', description: 'Gérez vos ressources, boosters et objets précieux.' },
  quests: { eyebrow: 'JOURNAL DE ROUTE', title: 'Quêtes', description: 'Progressez dans vos missions et récupérez vos récompenses.' },
  ranking: { eyebrow: 'HALL DES LÉGENDES', title: 'Classement général', description: 'Les meilleurs invocateurs de la saison actuelle.' },
  settings: { eyebrow: 'PRÉFÉRENCES', title: 'Paramètres', description: 'Personnalisez votre expérience de jeu.' },
};

export default function App() {
  const [activeElement, setActiveElement] = useState<'Tous' | Element>('Tous');
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState('');
  const [deck, setDeck] = useState<number[]>([1, 2, 3]);
  const [favorite, setFavorite] = useState(false);
  const [compact, setCompact] = useState(false);
  const [page, setPage] = useState<Page>('home');
  const [playOpen, setPlayOpen] = useState(false);
  const [collectionTab, setCollectionTab] = useState<'cards' | 'albums' | 'wishlist'>('cards');
  const [marketTab, setMarketTab] = useState<'listings' | 'trade'>('listings');
  const [tradeLocked, setTradeLocked] = useState(false);

  const filtered = useMemo(
    () =>
      cards.filter(
        (card) =>
          (activeElement === 'Tous' || card.element === activeElement) &&
          `${card.name} ${card.subtitle}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeElement, query],
  );

  const selected = cards.find((card) => card.id === selectedId) ?? cards[0];
  const inDeck = deck.includes(selected.id);
  const style = elementStyles[selected.element];

  const toggleDeck = () => {
    setDeck((current) =>
      current.includes(selected.id)
        ? current.filter((id) => id !== selected.id)
        : [...current, selected.id],
    );
  };

  const goTo = (nextPage: Page) => {
    setPage(nextPage);
    setPlayOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCollection = () => (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">ARCHIVES DES INVOCATEURS</p>
          <h1 className="collection-title">Ma collection</h1>
          <p>Explorez les forces anciennes et composez votre légende.</p>
        </div>
        <div className="collection-count"><b>84</b><span>cartes possédées<br />sur 120</span></div>
      </section>

      <div className="section-tabs">
        {([['cards', 'Cartes'], ['albums', 'Albums'], ['wishlist', 'Wishlist']] as const).map(([id, label]) => (
          <button key={id} className={collectionTab === id ? 'active' : ''} onClick={() => setCollectionTab(id)}>
            {label}{id === 'wishlist' && <span>12</span>}
          </button>
        ))}
      </div>

      {collectionTab === 'cards' ? (
        <>
          <section className="toolbar">
            <label className="search">
              <Icon name="search" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une carte..." />
            </label>
            <div className="elements" aria-label="Filtrer par élément">
              {(['Tous', 'Feu', 'Nature', 'Éther', 'Ombre', 'Givre'] as const).map((element) => (
                <button key={element} className={activeElement === element ? 'active' : ''} onClick={() => setActiveElement(element)}>
                  {element !== 'Tous' && <span style={{ color: elementStyles[element].color }}>{elementStyles[element].symbol}</span>}
                  {element}
                </button>
              ))}
            </div>
            <div className="view-toggle">
              <button className={!compact ? 'active' : ''} onClick={() => setCompact(false)} aria-label="Vue grille"><Icon name="grid" /></button>
              <button className={compact ? 'active' : ''} onClick={() => setCompact(true)} aria-label="Vue compacte"><Icon name="rows" /></button>
            </div>
          </section>

          <div className="content-grid">
            <section className="collection">
              <div className="results-row"><span>{filtered.length} cartes affichées</span><button>Rareté : toutes <span>⌄</span></button></div>
              {filtered.length ? (
                <div className={`cards-grid ${compact ? 'compact' : ''}`}>
                  {filtered.map((card) => (
                    <GameCard key={card.id} card={card} selected={selected.id === card.id} onSelect={() => { setSelectedId(card.id); setFavorite(false); }} />
                  ))}
                </div>
              ) : (
                <div className="empty-state"><span>◇</span><h3>Aucune carte trouvée</h3><p>Essayez un autre nom ou un autre élément.</p></div>
              )}
            </section>

            <aside className="detail-panel" style={{ '--element': style.color, '--glow': style.glow } as React.CSSProperties}>
              <div className="detail-visual">
                <CardArt card={selected} large />
                <span className="detail-cost">{selected.cost}</span>
                <button className={`favorite ${favorite ? 'active' : ''}`} onClick={() => setFavorite(!favorite)} aria-label="Ajouter aux favoris"><Icon name="heart" /></button>
              </div>
              <div className="detail-body">
                <div className="detail-meta"><span>{style.symbol} {selected.element}</span><span>{selected.rarity}</span></div>
                <h2>{selected.name}</h2><p className="subtitle">{selected.subtitle}</p>
                <div className="large-stats"><div><small>ATTAQUE</small><b>{selected.attack}</b></div><i /><div><small>DÉFENSE</small><b>{selected.defense}</b></div></div>
                <p className="ability">{selected.description}</p><blockquote>{selected.quote}</blockquote>
                <div className="set-info"><span>{selected.set}</span><span>FR</span></div>
                <button className={`deck-button ${inDeck ? 'remove' : ''}`} onClick={toggleDeck}><Icon name={inDeck ? 'minus' : 'plus'} />{inDeck ? 'Retirer du deck' : 'Ajouter au deck'}</button>
              </div>
            </aside>
          </div>
        </>
      ) : collectionTab === 'albums' ? (
        <div className="album-grid">
          {['Origines I', 'Échos du Néant', 'Royaumes de Givre'].map((album, index) => (
            <button className="album-card" key={album}><span>0{index + 1}</span><div><small>COLLECTION</small><h3>{album}</h3><p>{[84, 46, 29][index]} / 120 cartes</p><i><b style={{ width: `${[70, 38, 24][index]}%` }} /></i></div></button>
          ))}
        </div>
      ) : (
        <div className="wishlist-grid">
          {cards.slice(0, 4).map((card, index) => (
            <div className="wishlist-card" key={card.id}><CardArt card={card} /><div><small>RECHERCHÉE</small><h3>{card.name}</h3><p>{card.rarity} · {card.element}</p><button>Voir sur le marché</button></div><span>{index + 1}</span></div>
          ))}
        </div>
      )}
    </>
  );

  const renderHome = () => (
    <div className="home-page">
      <section className="home-intro"><p className="eyebrow">BIENVENUE, INVOCATEUR</p><h1>La Faille vous appelle.</h1><p>Un nouveau booster vous attend. Quelle légende renferme-t-il ?</p></section>
      <div className="home-layout">
        <aside className="achievements-panel">
          <div className="panel-heading"><div><small>PROGRESSION</small><h2>Succès</h2></div><span>18/64</span></div>
          {[
            ['Maître des braises', 'Gagner 10 duels avec un deck Feu', 70],
            ['Collectionneur', 'Obtenir 100 cartes différentes', 84],
            ['Sans une égratignure', 'Terminer un donjon sans défaite', 45],
          ].map(([title, text, progress]) => (
            <div className="achievement" key={title as string}><span className="achievement-gem">◇</span><div><h3>{title}</h3><p>{text}</p><i><b style={{ width: `${progress}%` }} /></i></div><em>{progress}%</em></div>
          ))}
          <button className="text-link" onClick={() => goTo('quests')}>Voir tous les succès →</button>
        </aside>

        <section className="booster-stage">
          <div className="summon-landscape" aria-hidden="true">
            <div className="summon-sky">
              {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
            </div>
            <span className="summon-moon" />
            <span className="mountain mountain-far" />
            <span className="mountain mountain-mid" />
            <span className="mountain mountain-near" />
            <div className="ancient-ruins">
              <i /><i /><i /><i /><span />
            </div>
            <div className="world-rift"><i /></div>
            <span className="summon-fog fog-one" />
            <span className="summon-fog fog-two" />
            <div className="summon-ground" />
          </div>
          <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
          <div className="stage-seal" aria-hidden="true"><span>◇</span><i>ORIGINES · EIDOLON · PRIMORDIA ·</i></div>
          <div className="booster-pack"><div className="pack-shine" /><span className="pack-logo">E</span><small>ORIGINES</small><strong>LA FAILLE<br />PRIMORDIALE</strong><em>5 CARTES</em></div>
          <div className="booster-copy"><span>BOOSTER GRATUIT</span><h2>Invocation quotidienne</h2><p>Disponible maintenant</p><button>Ouvrir le booster</button></div>
        </section>

        <aside className="summon-panel">
          <div className="panel-heading"><div><small>PORTAILS ACTIFS</small><h2>Invocations</h2></div><span>3</span></div>
          {[
            ['Aelyra, Cœur solaire', 'Bannière limitée', '2j 14h', 'fire'],
            ['Échos du Néant', 'Invocation événement', '6j 08h', 'void'],
            ['Archives anciennes', 'Bannière standard', 'Permanent', 'nature'],
          ].map(([title, label, time, theme]) => (
            <button className={`summon-banner ${theme}`} key={title}><div><small>{label}</small><h3>{title}</h3><p>{time}</p></div><span>›</span></button>
          ))}
        </aside>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="squads-page">
      <div className="tactical-map" aria-hidden="true">
        <div className="map-halo" />
        <div className="tactical-ring map-ring-outer">
          {Array.from({ length: 24 }, (_, index) => <i key={index} style={{ '--tick': `${index * 15}deg` } as React.CSSProperties} />)}
        </div>
        <div className="tactical-ring map-ring-runes">
          {['I', 'V', 'III', 'E', 'VII', 'N', 'IX', 'S'].map((rune, index) => <b key={rune} style={{ '--rune': `${index * 45}deg` } as React.CSSProperties}>{rune}</b>)}
        </div>
        <div className="tactical-ring map-ring-middle" />
        <div className="tactical-ring map-ring-inner" />
        <span className="map-axis axis-horizontal" />
        <span className="map-axis axis-vertical" />
        <span className="map-axis axis-diagonal-a" />
        <span className="map-axis axis-diagonal-b" />
        <div className="map-constellation">
          {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
          <span className="constellation-line line-a" />
          <span className="constellation-line line-b" />
          <span className="constellation-line line-c" />
          <span className="constellation-line line-d" />
        </div>
        <div className="map-core"><span>E</span><small>TACTICA</small></div>
        <div className="map-coordinate coordinate-north">N · 00</div>
        <div className="map-coordinate coordinate-east">E · 90</div>
        <div className="map-coordinate coordinate-south">S · 180</div>
        <div className="map-coordinate coordinate-west">W · 270</div>
        <div className="map-index">ORDO V · SECTEUR 07<br />LAT 48.856 · LONG 2.352</div>
      </div>
      <section className="page-heading standard-heading"><div><p className="eyebrow">COMMANDEMENT TACTIQUE</p><h1>Squads</h1><p>Composez et gérez vos escouades pour chaque bataille.</p></div><button className="gold-action">+ Nouvelle squad</button></section>
      <div className="squad-layout">
        <div className="squad-list">
          {['Escouade solaire', 'Veilleurs du Néant', 'Garde d’Émeraude'].map((name, index) => (
            <button className={index === 0 ? 'active' : ''} key={name}><span>0{index + 1}</span><div><h3>{name}</h3><p>{index === 0 ? 'Squad principale' : 'Squad secondaire'} · 5 membres</p></div><em>{[2840, 2510, 2320][index]} P</em></button>
          ))}
        </div>
        <div className="squad-stage">
          <div className="squad-meta"><span>SQUAD ACTIVE</span><strong>Puissance totale <b>2 840</b></strong></div>
          <div className="squad-members">
            {cards.slice(0, 5).map((card, index) => <div className={`member-slot ${index === 0 ? 'leader' : ''}`} key={card.id}><CardArt card={card} /><span>{index === 0 ? 'LEADER' : `POSTE ${index + 1}`}</span><h3>{card.name}</h3><small>Niv. {80 - index * 4}</small></div>)}
          </div>
          <button className="deck-button">Modifier la squad</button>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <>
      <section className="page-heading standard-heading"><div><p className="eyebrow">RÉSERVES DE LA CITADELLE</p><h1>Inventaire</h1><p>Gérez vos ressources, boosters et objets précieux.</p></div><div className="currency"><span>◇ 12 480</span><span>◆ 840</span></div></section>
      <div className="section-tabs"><button className="active">Tous</button><button>Objets</button><button>Matériaux</button><button>Boosters</button><button>Cosmétiques</button></div>
      <div className="inventory-grid">
        {['Booster Origines', 'Cristal d’Éther', 'Fragment solaire', 'Clé de donjon', 'Essence du Néant', 'Sceau universel', 'Poussière antique', 'Ticket d’arène'].map((item, index) => (
          <button className="inventory-item" key={item}><span className={`item-gem gem-${index % 5}`}>◇</span><div><h3>{item}</h3><p>{index % 2 ? 'Matériau rare' : 'Objet consommable'}</p></div><b>x{[12, 48, 106, 7, 24, 3, 890, 9][index]}</b></button>
        ))}
      </div>
    </>
  );

  const renderProfile = () => (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-sigil"><span>LV</span><i>62</i></div>
        <div className="profile-identity">
          <p className="eyebrow">PROFIL D’INVOCATEUR</p>
          <h1>LeVeilleur</h1>
          <p><span>Fléau de la Tour</span> · Membre depuis la Saison I</p>
        </div>
        <div className="profile-rank"><small>RANG ACTUEL</small><span>◇</span><div><b>Ascendant II</b><em>2 840 points</em></div></div>
        <button className="profile-edit">Modifier le profil</button>
      </section>

      <section className="profile-stats">
        {[['327', 'Victoires'], ['84', 'Cartes'], ['42', 'Personnages'], ['18', 'Succès'], ['61%', 'Taux de victoire']].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
      </section>

      <div className="profile-grid">
        <section className="profile-showcase">
          <div className="profile-section-heading"><div><small>VITRINE PUBLIQUE</small><h2>Personnages favoris</h2></div><button>Personnaliser</button></div>
          <div className="character-showcase">
            {cards.slice(0, 3).map((card, index) => (
              <div className={index === 0 ? 'featured' : ''} key={card.id}><CardArt card={card} /><span>{index === 0 ? 'PERSONNAGE PHARE' : 'FAVORI'}</span><h3>{card.name}</h3><p>Niveau {80 - index * 5} · {card.element}</p></div>
            ))}
          </div>
        </section>

        <aside className="title-cabinet">
          <div className="profile-section-heading"><div><small>COLLECTION</small><h2>Titres</h2></div><span>12/48</span></div>
          {[
            ['Fléau de la Tour', 'Équipé', 'legend'],
            ['Maître des braises', 'Rare', 'fire'],
            ['Archiviste', 'Épique', 'ether'],
            ['Sans peur', 'Commun', 'plain'],
          ].map(([title, rarity, theme]) => <button className={`profile-title ${theme}`} key={title}><span>◇</span><div><h3>{title}</h3><p>{rarity}</p></div>{rarity === 'Équipé' && <b>ACTIF</b>}</button>)}
          <button className="text-link">Voir les 12 titres →</button>
        </aside>

        <section className="profile-achievements">
          <div className="profile-section-heading"><div><small>PROGRESSION</small><h2>Succès récents</h2></div><span>18/64 complétés</span></div>
          <div className="achievement-row">
            {[
              ['Sommet du monde', 'Atteindre l’étage 50 de la Tour', 'Très rare'],
              ['Main parfaite', 'Gagner sans perdre de carte', 'Épique'],
              ['Premier pacte', 'Effectuer un échange avec un joueur', 'Commun'],
            ].map(([title, description, rarity], index) => <div key={title}><span className={`achievement-medal medal-${index}`}>◇</span><h3>{title}</h3><p>{description}</p><small>{rarity}</small></div>)}
          </div>
        </section>
      </div>
    </div>
  );

  const renderMarket = () => (
    <>
      <section className="page-heading standard-heading">
        <div><p className="eyebrow">COMPTOIR DES MONDES</p><h1>Marché</h1><p>Échangez des cartes et découvrez les offres des invocateurs.</p></div>
        <div className="currency"><span>◇ 12 480</span><span>◆ 840</span></div>
      </section>
      <div className="section-tabs market-tabs">
        <button className={marketTab === 'listings' ? 'active' : ''} onClick={() => setMarketTab('listings')}>Marché global</button>
        <button className={marketTab === 'trade' ? 'active' : ''} onClick={() => setMarketTab('trade')}>Échange direct <span>1</span></button>
      </div>
      {marketTab === 'listings' ? (
        <>
          <section className="market-toolbar">
            <label className="search"><Icon name="search" /><input placeholder="Rechercher une carte ou un vendeur..." /></label>
            <button>Rareté : toutes ⌄</button><button>Extension : toutes ⌄</button><button>Prix croissant ⌄</button>
            <button className="sell-button">+ Créer une annonce</button>
          </section>
          <div className="market-listings">
            {cards.map((card, index) => (
              <article className="listing-card" key={card.id}>
                <div className="listing-art"><CardArt card={card} /><span>{card.rarity}</span></div>
                <div className="listing-copy"><small>{card.element} · {card.set.split('·')[0]}</small><h3>{card.name}</h3><p>Vendeur <b>{['Morrigan', 'Kael', 'Nox', 'Sélène', 'Orion', 'Vesper'][index]}</b> · il y a {index + 1} min</p></div>
                <div className="price-trend"><span>{index % 2 ? '− 3.2%' : '+ 1.8%'}</span><i><b style={{ width: `${45 + index * 7}%` }} /></i><small>Prix moyen {[1750, 620, 910, 440, 2100, 180][index]} ◇</small></div>
                <div className="listing-price"><small>PRIX DIRECT</small><b>{[1820, 590, 940, 425, 2050, 195][index]} <span>◇</span></b><button>Acheter</button></div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="trade-console">
          <div className="trade-status"><div><span className="status-dot" /><p>Échange avec <b>Morrigan#2841</b></p></div><small>Canal sécurisé · Offre active depuis 02:18</small></div>
          <div className="trade-columns">
            <section className={`trade-offer ${tradeLocked ? 'locked' : ''}`}>
              <div className="offer-heading"><div><small>VOTRE OFFRE</small><h2>LeVeilleur</h2></div><span>{tradeLocked ? 'VERROUILLÉE' : 'MODIFIABLE'}</span></div>
              <div className="offer-cards">
                {cards.slice(1, 3).map((card) => <div key={card.id}><CardArt card={card} /><span>×1</span><h3>{card.name}</h3></div>)}
                <button className="add-trade-item"><Icon name="plus" /><span>Ajouter une carte</span></button>
              </div>
              <div className="crystal-offer"><span>◇ Cristaux proposés</span><div><button>−</button><b>500</b><button>+</button></div></div>
              <div className="offer-value"><span>Valeur estimée</span><b>1 850 ◇</b></div>
            </section>

            <div className="trade-balance"><span>⇄</span><small>ÉCART ESTIMÉ</small><b>3,7%</b><p>Échange équilibré</p></div>

            <section className="trade-offer partner">
              <div className="offer-heading"><div><small>OFFRE DE L’AUTRE JOUEUR</small><h2>Morrigan</h2></div><span>VALIDÉE</span></div>
              <div className="offer-cards">
                <div><CardArt card={cards[4]} /><span>×1</span><h3>{cards[4].name}</h3></div>
                <div className="empty-trade-slot"><span>◇</span><p>Emplacement vide</p></div>
                <div className="empty-trade-slot"><span>◇</span><p>Emplacement vide</p></div>
              </div>
              <div className="crystal-offer"><span>◇ Cristaux proposés</span><div><b>200</b></div></div>
              <div className="offer-value"><span>Valeur estimée</span><b>1 920 ◇</b></div>
            </section>
          </div>
          <div className="trade-footer"><p><span>!</span> Vérifiez chaque élément. Une fois les deux offres verrouillées, l’échange sera définitif.</p><button className={tradeLocked ? 'locked' : ''} onClick={() => setTradeLocked(!tradeLocked)}>{tradeLocked ? 'Déverrouiller mon offre' : 'Verrouiller et confirmer'}</button></div>
        </div>
      )}
    </>
  );

  const renderSimplePage = () => {
    const mode = playModes.find((item) => item.id === page);
    const content = mode
      ? { eyebrow: mode.tag.toUpperCase(), title: mode.title, description: mode.description }
      : pageNames[page] ?? pageNames.quests!;
    return (
      <div className="simple-page">
        <p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p>{content.description}</p>
        <div className="simple-hero"><span>{mode?.symbol ?? '◇'}</span><div><small>{mode ? 'DESTINATION PRÊTE' : 'SECTION EN PRÉPARATION'}</small><h2>{mode ? 'Votre prochaine aventure commence ici.' : 'De nouveaux contenus arrivent bientôt.'}</h2><p>Cette page est prête à accueillir ses fonctionnalités détaillées dans la prochaine étape.</p>{mode && <button className="gold-action">Lancer une partie</button>}</div></div>
      </div>
    );
  };

  return (
    <div className="app-shell" data-page={page}>
      <div className="ambient-fx" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => <i key={index} />)}
      </div>
      <div className="page-mythology" aria-hidden="true">
        <div className="lore-system">
          <div className="lore-ring lore-ring-a">
            {Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--lore-tick': `${index * 18}deg` } as React.CSSProperties} />)}
          </div>
          <div className="lore-ring lore-ring-b" />
          <div className="lore-ring lore-ring-c" />
          <span className="lore-axis lore-axis-x" />
          <span className="lore-axis lore-axis-y" />
          <div className="lore-shape" />
          <div className="lore-glyph" />
          <small className="lore-name" />
          <small className="lore-code" />
          <div className="lore-nodes">
            {Array.from({ length: 7 }, (_, index) => <b key={index} />)}
          </div>
        </div>
      </div>
      <header className="topbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Eidolon accueil">
          <span className="brand-mark">E</span>
          <span>
            <b>EIDOLON</b>
            <small>TRADING CARD GAME</small>
          </span>
        </button>
        <nav className="game-nav">
          <div className="nav-side nav-left">
            <button className={page === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Accueil</button>
            <div className="nav-dropdown">
              <button className={page === 'collection' ? 'active' : ''} onClick={() => goTo('collection')}>Collection <span>⌄</span></button>
              <div className="dropdown-panel">
                <button onClick={() => { setCollectionTab('cards'); goTo('collection'); }}>Cartes</button>
                <button onClick={() => { setCollectionTab('albums'); goTo('collection'); }}>Albums</button>
                <button onClick={() => { setCollectionTab('wishlist'); goTo('collection'); }}>Wishlist <span>12</span></button>
              </div>
            </div>
            <button className={page === 'inventory' ? 'active' : ''} onClick={() => goTo('inventory')}>Inventaire</button>
            <button className={page === 'team' ? 'active' : ''} onClick={() => goTo('team')}>Squads</button>
          </div>
          <button className={`play-button ${playOpen ? 'active' : ''}`} onClick={() => setPlayOpen(!playOpen)}><span>JOUER</span><i /></button>
          <div className="nav-side nav-right">
            <button className={page === 'quests' ? 'active' : ''} onClick={() => goTo('quests')}>Quêtes</button>
            <button className={page === 'market' ? 'active' : ''} onClick={() => goTo('market')}>Marché</button>
            <button className={page === 'ranking' ? 'active' : ''} onClick={() => goTo('ranking')}>Classement</button>
            <button className={page === 'settings' ? 'active' : ''} onClick={() => goTo('settings')}>Paramètres</button>
          </div>
        </nav>
        <div className="header-actions">
          <div className="season-mark"><small>SAISON I</small><span>LA FAILLE</span></div>
          <button className="deck-pill" onClick={() => goTo('team')}><Icon name="cards" /><span>{deck.length}/40</span></button>
          <button className={`avatar ${page === 'profile' ? 'active' : ''}`} onClick={() => goTo('profile')} aria-label="Profil">LV</button>
        </div>
      </header>

      {playOpen && (
        <div className="play-overlay" onClick={() => setPlayOpen(false)}>
          <div className="play-menu" onClick={(event) => event.stopPropagation()}>
            <div className="play-heading"><div><p className="eyebrow">CHOISISSEZ VOTRE DESTINATION</p><h2>Comment voulez-vous jouer ?</h2></div><button onClick={() => setPlayOpen(false)}>Fermer ×</button></div>
            <div className="mode-grid">
              {playModes.map((mode) => (
                <button className={`mode-card mode-${mode.id}`} key={mode.id} onClick={() => goTo(mode.id)}>
                  <span className="mode-symbol">{mode.symbol}</span><small>{mode.tag}</small><h3>{mode.title}</h3><p>{mode.description}</p><i>Explorer →</i>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={page === 'home' ? 'home-main' : ''}>
        {page === 'home' && renderHome()}
        {page === 'collection' && renderCollection()}
        {page === 'inventory' && renderInventory()}
        {page === 'team' && renderTeam()}
        {page === 'profile' && renderProfile()}
        {page === 'market' && renderMarket()}
        {!['home', 'collection', 'inventory', 'team', 'profile', 'market'].includes(page) && renderSimplePage()}
      </main>
    </div>
  );
}
