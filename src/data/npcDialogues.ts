export interface NPCDialogue {
  id: string;
  name: string;
  avatar?: string;
  dialogues: {
    initial: string[];
    conversations: {
      id: string;
      text: string;
      responses?: {
        text: string;
        nextId?: string;
        action?: string;
      }[];
    }[];
  };
}

export const npcDialogues: Record<string, NPCDialogue[]> = {
  'usa-la': [
    {
      id: 'venice-local',
      name: 'Marcus "The Original"',
      dialogues: {
        initial: [
          "Yo, welcome to Venice Beach! You look like you got some moves.",
          "This is where the real Krump was born, homie. You ready to learn?"
        ],
        conversations: [
          {
            id: 'about-krump',
            text: "Krump ain't just about the moves, it's about the SPIRIT! It's about expressing your pain, your joy, your EVERYTHING!",
            responses: [
              { text: "Tell me about Venice Beach", nextId: 'about-venice' },
              { text: "Who's the toughest dancer here?", nextId: 'about-boss' },
              { text: "Thanks for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'about-venice',
            text: "Venice is the HEART of Krump culture. Every corner, every alley has stories of dancers who changed the game!",
            responses: [
              { text: "What makes Krump special?", nextId: 'about-krump' },
              { text: "See you around", nextId: 'farewell' }
            ]
          },
          {
            id: 'about-boss',
            text: "Big Homie runs these streets. He's been battling since day one. You want to face him? You better bring EVERYTHING!",
            responses: [
              { text: "How do I get stronger?", nextId: 'training-advice' },
              { text: "I'm ready for anyone", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-advice',
            text: "Hit up the studios, join the cyphers, feel the music in your SOUL! And remember - it's not about perfect technique, it's about RAW emotion!",
            responses: [
              { text: "Thanks for the advice", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Keep that fire burning, young dancer. Venice will always be here for you!"
          }
        ]
      }
    },
    {
      id: 'studio-owner',
      name: 'Carmen Rodriguez',
      dialogues: {
        initial: [
          "Welcome to Movement Lifestyle! I've been teaching Krump here for over a decade.",
          "Every great dancer started where you are now. Ready to begin your journey?"
        ],
        conversations: [
          {
            id: 'about-studio',
            text: "This studio has seen legends born. We focus on RAW and BEASTY styles - the foundation of true Krump power!",
            responses: [
              { text: "What's the difference between styles?", nextId: 'about-styles' },
              { text: "Can you teach me?", nextId: 'training-offer' },
              { text: "Maybe later", nextId: 'farewell' }
            ]
          },
          {
            id: 'about-styles',
            text: "RAW is pure emotion - channeling your pain into movement. BEASTY is controlled aggression - power with purpose. Both come from the HEART!",
            responses: [
              { text: "How do I develop my style?", nextId: 'style-advice' },
              { text: "I want to learn both", nextId: 'training-offer' }
            ]
          },
          {
            id: 'style-advice',
            text: "Don't copy others - find YOUR voice! Krump is about authenticity. Battle, train, live the culture, and your style will emerge naturally!",
            responses: [
              { text: "That's deep, thank you", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-offer',
            text: "The training center is always open to dedicated dancers. Come back when you're ready to push your limits!",
            responses: [
              { text: "I'll be back soon", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Remember - dance with your SOUL, not just your body. See you soon!"
          }
        ]
      }
    }
  ],
  'japan-tokyo': [
    {
      id: 'shibuya-guide',
      name: 'Kenji "Speed Demon"',
      dialogues: {
        initial: [
          "Konnichiwa! Tokyo's Krump scene is INSANE - we mix traditional discipline with raw street energy!",
          "You want to learn the Tokyo way? Precision meets power!"
        ],
        conversations: [
          {
            id: 'about-tokyo',
            text: "Tokyo Krump is unique - we bring Japanese perfectionism to raw street dance. TECHNICAL and FAST styles dominate here!",
            responses: [
              { text: "How is it different from LA?", nextId: 'cultural-difference' },
              { text: "Who's the best dancer?", nextId: 'about-boss' },
              { text: "Teach me the Tokyo way", nextId: 'training-request' }
            ]
          },
          {
            id: 'cultural-difference',
            text: "In LA, it's all heart and soul. Here, we add DISCIPLINE and SPEED. Same fire, different focus. Both are beautiful!",
            responses: [
              { text: "That sounds challenging", nextId: 'challenge-response' },
              { text: "I respect that approach", nextId: 'farewell' }
            ]
          },
          {
            id: 'about-boss',
            text: "Tech Master Yuki is LEGENDARY! His combinations are so fast, so precise - like a samurai with perfect rhythm!",
            responses: [
              { text: "How do I prepare for him?", nextId: 'boss-advice' },
              { text: "Sounds intense", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-request',
            text: "Train at EN Dance Studio! Master the fundamentals first, then add SPEED and TECHNIQUE. No shortcuts to greatness!",
            responses: [
              { text: "I'll put in the work", nextId: 'farewell' }
            ]
          },
          {
            id: 'challenge-response',
            text: "That's the spirit! Tokyo will push you to your limits, but you'll come out STRONGER!",
            responses: [
              { text: "I'm ready for anything", nextId: 'farewell' }
            ]
          },
          {
            id: 'boss-advice',
            text: "Master your TECHNICAL skills, increase your SPEED, and most importantly - don't lose your SOUL in the precision!",
            responses: [
              { text: "Thanks for the guidance", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Ganbatte! Show Tokyo what you're made of!"
          }
        ]
      }
    }
  ],
  'france-paris': [
    {
      id: 'seine-artist',
      name: 'Marcel "Le Artiste"',
      dialogues: {
        initial: [
          "Bonjour! Welcome to Paris, where Krump becomes ART! We bring FLASHY elegance to street dance.",
          "You want to dance with Parisian flair? Magnifique!"
        ],
        conversations: [
          {
            id: 'about-paris',
            text: "Paris transforms Krump into poetry in motion! We emphasize FLASHY and TECHNICAL - making every move a masterpiece!",
            responses: [
              { text: "How is Paris style unique?", nextId: 'paris-style' },
              { text: "Who should I watch out for?", nextId: 'about-boss' },
              { text: "Where can I train?", nextId: 'training-info' }
            ]
          },
          {
            id: 'paris-style',
            text: "We bring sophistication to raw power! Think of it as... controlled chaos with artistic flair. FLASHY movements with TECHNICAL precision!",
            responses: [
              { text: "That sounds beautiful", nextId: 'artistic-response' },
              { text: "Can you teach me?", nextId: 'training-info' }
            ]
          },
          {
            id: 'about-boss',
            text: "Artiste Supreme is... how you say... MAGNIFIQUE! His style is like watching a painting come to life - deadly beautiful!",
            responses: [
              { text: "How do I prepare?", nextId: 'boss-preparation' },
              { text: "Sounds formidable", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-info',
            text: "Studio Harmonic by the Seine! We focus on FLASHY technique and TECHNICAL artistry. Come prepared to express your inner artist!",
            responses: [
              { text: "I'll be there", nextId: 'farewell' }
            ]
          },
          {
            id: 'artistic-response',
            text: "Oui! Dance is the ultimate art form - your body is the brush, the floor is your canvas!",
            responses: [
              { text: "I want to learn this style", nextId: 'training-info' },
              { text: "Beautifully said", nextId: 'farewell' }
            ]
          },
          {
            id: 'boss-preparation',
            text: "Master FLASHY combinations and TECHNICAL perfection. But remember - without emotion, even perfect technique is... how you say... vide!",
            responses: [
              { text: "Merci for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Au revoir! May your dance become a work of art!"
          }
        ]
      }
    },
    {
      id: 'montmartre-artist',
      name: 'Camille "La Visionnaire"',
      dialogues: {
        initial: [
          "From ze heights of Montmartre, I see all of Paris dance below!",
          "Krump here is... how you say... revolutionary art!"
        ],
        conversations: [
          {
            id: 'about-montmartre',
            text: "Montmartre has always been ze place of artistic revolution! Now Krump joins zis legacy of expression and rebellion!",
            responses: [
              { text: "What makes this area special?", nextId: 'artistic-legacy' },
              { text: "How does art influence Krump here?", nextId: 'art-influence' },
              { text: "Any advice for me?", nextId: 'artistic-advice' }
            ]
          },
          {
            id: 'artistic-legacy',
            text: "Picasso, Renoir, Toulouse-Lautrec... they all found inspiration here. Now we dancers continue zis tradition with our bodies as brushes!",
            responses: [
              { text: "That's inspiring", nextId: 'artistic-advice' },
              { text: "I want to be part of this legacy", nextId: 'farewell' }
            ]
          },
          {
            id: 'art-influence',
            text: "In Montmartre, we see Krump as painting with ze whole body! Every movement must have meaning, every gesture tells a story!",
            responses: [
              { text: "How can I dance with more meaning?", nextId: 'artistic-advice' },
              { text: "Beautiful perspective", nextId: 'farewell' }
            ]
          },
          {
            id: 'artistic-advice',
            text: "Visit ze old studios, breathe ze creative energy! Let ze spirit of artistic rebellion flow through your dance, mon ami!",
            responses: [
              { text: "I'll explore the area", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Bonne chance! Create something beautiful with your dance!"
          }
        ]
      }
    }
  ],
  'germany-berlin': [
    {
      id: 'underground-veteran',
      name: 'Klaus "Untergrund"',
      dialogues: {
        initial: [
          "Willkommen to Berlin! Underground Krump capital of Europe!",
          "Here, we keep it RAW and GRITTY - no pretense, just pure EMOTION!"
        ],
        conversations: [
          {
            id: 'about-berlin',
            text: "Berlin Krump is UNDERGROUND culture! We focus on RAW emotion and GRITTY power - dancing our struggles, our freedom!",
            responses: [
              { text: "Tell me about the underground", nextId: 'underground-culture' },
              { text: "Who runs this scene?", nextId: 'about-boss' },
              { text: "Where do I train?", nextId: 'training-spots' }
            ]
          },
          {
            id: 'underground-culture',
            text: "The tunnels, the abandoned buildings - this is where real dance happens! No judges, no rules, just TRUTH!",
            responses: [
              { text: "That sounds intense", nextId: 'intensity-response' },
              { text: "I respect that authenticity", nextId: 'farewell' }
            ]
          },
          {
            id: 'about-boss',
            text: "Beast of Berlin... he's LEGEND in these tunnels. Raw power, unstoppable energy. Prepare for WAR when you face him!",
            responses: [
              { text: "How do I get ready?", nextId: 'preparation-advice' },
              { text: "I'll be ready", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-spots',
            text: "Forget fancy studios - train in the STREETS! Underground tunnels, abandoned warehouses. Real training for real dancers!",
            responses: [
              { text: "Show me the way", nextId: 'farewell' }
            ]
          },
          {
            id: 'intensity-response',
            text: "Ja! Berlin doesn't play games. But if you survive here, you can dance ANYWHERE!",
            responses: [
              { text: "I'm ready for the challenge", nextId: 'farewell' }
            ]
          },
          {
            id: 'preparation-advice',
            text: "Build your RAW power, embrace your GRITTY side. Feel the city's pain and channel it into your movements!",
            responses: [
              { text: "Danke for the advice", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Viel Glück! The underground is watching..."
          }
        ]
      }
    }
  ],
  'korea-seoul': [
    {
      id: 'hongdae-street-dancer',
      name: 'Jin "K-Krump King"',
      dialogues: {
        initial: [
          "Annyeonghaseyo! Welcome to Seoul - where K-pop meets KRUMP!",
          "You want to learn Korean-style? We bring precision and SPEED to everything!"
        ],
        conversations: [
          {
            id: 'about-seoul',
            text: "Seoul Krump is UNIQUE! We mix traditional discipline with street energy. FAST and TECHNICAL - like lightning with soul!",
            responses: [
              { text: "How does K-pop influence Krump?", nextId: 'kpop-influence' },
              { text: "Who's the strongest here?", nextId: 'about-boss' },
              { text: "Where should I train?", nextId: 'training-advice' }
            ]
          },
          {
            id: 'kpop-influence',
            text: "K-pop gave us choreography precision, but Krump gives us SOUL! Together, they create something beautiful and powerful!",
            responses: [
              { text: "That's an interesting fusion", nextId: 'fusion-response' },
              { text: "Can you teach me?", nextId: 'training-advice' }
            ]
          },
          {
            id: 'about-boss',
            text: "Speed King Jin is LEGENDARY! His combinations are so fast, so clean - like watching art in motion!",
            responses: [
              { text: "How do I prepare for him?", nextId: 'boss-preparation' },
              { text: "Sounds challenging", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-advice',
            text: "Train at Hongdae studios! Focus on SPEED and TECHNICAL precision. But remember - don't lose your heart in the technique!",
            responses: [
              { text: "I'll remember that", nextId: 'farewell' }
            ]
          },
          {
            id: 'fusion-response',
            text: "Exactly! East meets West, tradition meets innovation. That's the Seoul way!",
            responses: [
              { text: "I want to learn this style", nextId: 'training-advice' },
              { text: "Respect!", nextId: 'farewell' }
            ]
          },
          {
            id: 'boss-preparation',
            text: "Master your SPEED, perfect your TECHNICAL skills, but keep your Korean heart strong!",
            responses: [
              { text: "Kamsahamnida!", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Hwaiting! Show Seoul your spirit!"
          }
        ]
      }
    },
    {
      id: 'kpop-fusion-expert',
      name: 'Mina "Fusion Master"',
      dialogues: {
        initial: [
          "I've been fusing K-pop with Krump for years! The results are AMAZING!",
          "Want to learn how to make dance that's both beautiful AND powerful?"
        ],
        conversations: [
          {
            id: 'about-fusion',
            text: "K-pop teaches discipline and formations, Krump teaches freedom and emotion. Combined? Pure MAGIC!",
            responses: [
              { text: "How do you balance both?", nextId: 'balance-advice' },
              { text: "What makes it special?", nextId: 'special-quality' },
              { text: "Show me the way", nextId: 'training-offer' }
            ]
          },
          {
            id: 'balance-advice',
            text: "Start with K-pop structure, then let Krump emotion flow through it. Like a river finding its path!",
            responses: [
              { text: "That's beautiful", nextId: 'farewell' }
            ]
          },
          {
            id: 'special-quality',
            text: "It's dance that speaks to both the mind AND the soul! Technical perfection with raw emotion!",
            responses: [
              { text: "I want to learn this", nextId: 'training-offer' }
            ]
          },
          {
            id: 'training-offer',
            text: "Practice at the studios, but remember - fusion is about finding YOUR unique voice between two worlds!",
            responses: [
              { text: "I'll find my voice", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "May your dance bridge all worlds!"
          }
        ]
      }
    }
  ],
  'brazil-rio': [
    {
      id: 'favela-dance-mentor',
      name: 'Paulo "Favela Flow"',
      dialogues: {
        initial: [
          "Oi! Welcome to Rio, where dance is LIFE! Here in the favela, we dance with our hearts!",
          "You want to learn Brazilian Krump? Prepare for CARNIVAL energy!"
        ],
        conversations: [
          {
            id: 'about-rio',
            text: "Rio Krump is JOYFUL power! We bring carnival spirit to street dance - GOOFY and FLASHY with pure Brazilian soul!",
            responses: [
              { text: "How is it different?", nextId: 'rio-difference' },
              { text: "Who leads the scene?", nextId: 'about-boss' },
              { text: "Where do I learn?", nextId: 'training-spots' }
            ]
          },
          {
            id: 'rio-difference',
            text: "We dance our struggles AND our celebrations! Samba rhythm meets Krump power - it's BEAUTIFUL chaos!",
            responses: [
              { text: "That sounds amazing", nextId: 'celebration-response' },
              { text: "Teach me this style", nextId: 'training-spots' }
            ]
          },
          {
            id: 'about-boss',
            text: "Carnival King Carlos! He moves like the spirit of carnival itself - impossible to predict, impossible to stop!",
            responses: [
              { text: "How do I prepare?", nextId: 'boss-advice' },
              { text: "Sounds wild", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-spots',
            text: "Train everywhere! Beach cyphers, favela studios, street corners - Rio IS our dance floor!",
            responses: [
              { text: "Obrigado for the guidance", nextId: 'farewell' }
            ]
          },
          {
            id: 'celebration-response',
            text: "Exato! Life is hard, but dance makes it BEAUTIFUL! That's the Brazilian way!",
            responses: [
              { text: "I want to learn this energy", nextId: 'training-spots' },
              { text: "Beautiful philosophy", nextId: 'farewell' }
            ]
          },
          {
            id: 'boss-advice',
            text: "Embrace JOY in your movement! Carlos respects dancers who bring happiness to the battle!",
            responses: [
              { text: "I'll remember that", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Vai com Deus! Let your dance shine like carnival!"
          }
        ]
      }
    },
    {
      id: 'carnival-expert',
      name: 'Isabella "Carnival Queen"',
      dialogues: {
        initial: [
          "Olá! I choreograph for Carnival AND street battles! Both need the same thing - PASSION!",
          "You want to understand Rio's dance spirit? Let me share the secrets!"
        ],
        conversations: [
          {
            id: 'about-carnival',
            text: "Carnival is Rio's SOUL! We put that same energy into Krump - colorful, explosive, full of LIFE!",
            responses: [
              { text: "How do you capture that in battle?", nextId: 'battle-carnival' },
              { text: "What's the secret?", nextId: 'carnival-secret' },
              { text: "Teach me this approach", nextId: 'learning-request' }
            ]
          },
          {
            id: 'battle-carnival',
            text: "Every battle is a mini-carnival! Bring joy, bring color, bring CELEBRATION to your movement!",
            responses: [
              { text: "That's a beautiful way to battle", nextId: 'farewell' }
            ]
          },
          {
            id: 'carnival-secret',
            text: "The secret is ALEGRIA - happiness! Even in struggle, find the joy and let it FLOW through your dance!",
            responses: [
              { text: "Alegria... I like that", nextId: 'learning-request' }
            ]
          },
          {
            id: 'learning-request',
            text: "Practice at Copacabana, feel the ocean breeze, let Rio's energy become YOUR energy!",
            responses: [
              { text: "Muito obrigado!", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Que Deus te abençoe! Dance like it's Carnival every day!"
          }
        ]
      }
    }
  ],
  'uk-london': [
    {
      id: 'east-end-veteran',
      name: 'Tommy "Underground"',
      dialogues: {
        initial: [
          "Right then, welcome to East London! This is where REAL street dance happens, innit?",
          "You want to learn the London way? It's GULLY and RAW - no fancy stuff, just truth!"
        ],
        conversations: [
          {
            id: 'about-london',
            text: "London Krump is PURE underground culture! We keep it GULLY and RAW - working class pride in every move!",
            responses: [
              { text: "What makes it unique?", nextId: 'london-unique' },
              { text: "Who runs these streets?", nextId: 'about-boss' },
              { text: "Where do I train?", nextId: 'training-advice' }
            ]
          },
          {
            id: 'london-unique',
            text: "It's proper GRITTY, mate! No pretense, no flash - just honest emotion from honest people living honest struggles!",
            responses: [
              { text: "I respect that authenticity", nextId: 'respect-response' },
              { text: "Sounds intense", nextId: 'intensity-response' }
            ]
          },
          {
            id: 'about-boss',
            text: "Underground Legend Max - he's MENTAL! Been ruling these tunnels since day one. Proper beast, that one!",
            responses: [
              { text: "How do I prepare for him?", nextId: 'boss-preparation' },
              { text: "Blimey, sounds tough", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-advice',
            text: "Forget posh studios - train in the STREETS! Tunnels, car parks, anywhere REAL! That's where you learn truth!",
            responses: [
              { text: "Cheers for the advice", nextId: 'farewell' }
            ]
          },
          {
            id: 'respect-response',
            text: "Too right! London don't do fake - what you see is what you get!",
            responses: [
              { text: "I want to learn this honesty", nextId: 'training-advice' },
              { text: "Respect", nextId: 'farewell' }
            ]
          },
          {
            id: 'intensity-response',
            text: "Course it's intense! London streets made us tough - but fair!",
            responses: [
              { text: "I'm ready for it", nextId: 'training-advice' }
            ]
          },
          {
            id: 'boss-preparation',
            text: "Build your GULLY strength, embrace the RAW emotion. Max respects realness above all!",
            responses: [
              { text: "Sound advice, ta", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Right, off you go then! Show London what you're made of!"
          }
        ]
      }
    },
    {
      id: 'grime-scene-expert',
      name: 'Jade "Grime Queen"',
      dialogues: {
        initial: [
          "Wagwan! I've been mixing grime with Krump since time! The energy is SICK!",
          "You want to understand UK street culture? Grime and Krump are brothers!"
        ],
        conversations: [
          {
            id: 'about-grime',
            text: "Grime gave us the ATTITUDE, Krump gave us the MOVEMENT! Together they create something proper MENTAL!",
            responses: [
              { text: "How do they work together?", nextId: 'grime-krump-fusion' },
              { text: "What's the energy like?", nextId: 'energy-description' },
              { text: "Teach me this style", nextId: 'learning-offer' }
            ]
          },
          {
            id: 'grime-krump-fusion',
            text: "Grime's rapid-fire lyrics match Krump's explosive movement - both are about releasing pressure, innit!",
            responses: [
              { text: "That makes perfect sense", nextId: 'understanding-response' },
              { text: "Show me how", nextId: 'learning-offer' }
            ]
          },
          {
            id: 'energy-description',
            text: "It's PURE London energy - urban, raw, unfiltered truth! Like the city itself in dance form!",
            responses: [
              { text: "I want to feel that energy", nextId: 'learning-offer' },
              { text: "Powerful stuff", nextId: 'farewell' }
            ]
          },
          {
            id: 'learning-offer',
            text: "Train in the underground scenes - that's where the REAL fusion happens! Feel the city's heartbeat!",
            responses: [
              { text: "Safe, I'll check it out", nextId: 'farewell' }
            ]
          },
          {
            id: 'understanding-response',
            text: "Exactly! Both are ways of expressing what words can't - pure FEELING!",
            responses: [
              { text: "I get it now", nextId: 'learning-offer' }
            ]
          },
          {
            id: 'farewell',
            text: "Laters! Let the underground embrace you!"
          }
        ]
      }
    }
  ],
  'russia-moscow': [
    {
      id: 'red-square-veteran',
      name: 'Dmitri "Iron Soul"',
      dialogues: {
        initial: [
          "Privet, comrade! Welcome to Moscow - where dance is forged in IRON!",
          "Here we train like soldiers, dance like warriors! You ready for Russian power?"
        ],
        conversations: [
          {
            id: 'about-moscow',
            text: "Moscow Krump is STEEL and FIRE! We bring Soviet discipline to street dance - BEASTY and RAW like Siberian winter!",
            responses: [
              { text: "How is Russian style different?", nextId: 'russian-difference' },
              { text: "Who's the strongest here?", nextId: 'about-boss' },
              { text: "Where do I train?", nextId: 'training-advice' }
            ]
          },
          {
            id: 'russian-difference',
            text: "We dance through PAIN, through COLD, through everything! Russian soul is unbreakable - like our dance!",
            responses: [
              { text: "That's incredibly strong", nextId: 'strength-response' },
              { text: "Teach me this resilience", nextId: 'training-advice' }
            ]
          },
          {
            id: 'about-boss',
            text: "Iron Dancer Dmitri - he's LEGEND! Moves like machine, heart like furnace. Prepare for battle of IRON WILL!",
            responses: [
              { text: "How do I prepare for him?", nextId: 'boss-preparation' },
              { text: "Sounds formidable", nextId: 'farewell' }
            ]
          },
          {
            id: 'training-advice',
            text: "Train in COLD, train in PAIN! Russian way is hard way, but it makes you UNBREAKABLE!",
            responses: [
              { text: "Spasibo for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'strength-response',
            text: "Da! Russian people survive everything - revolution, war, winter. This makes our dance POWERFUL!",
            responses: [
              { text: "I want to learn this strength", nextId: 'training-advice' },
              { text: "Incredible heritage", nextId: 'farewell' }
            ]
          },
          {
            id: 'boss-preparation',
            text: "Build BEASTY power, develop RAW emotion. Dmitri respects only those who know true struggle!",
            responses: [
              { text: "I'll forge myself in iron", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Do svidaniya! May your dance be strong as Russian steel!"
          }
        ]
      }
    },
    {
      id: 'metro-dancer',
      name: 'Katya "Metro Queen"',
      dialogues: {
        initial: [
          "Zdravstvuyte! I dance in Moscow metro since I was child! Underground trains, underground culture!",
          "You want to understand Russian dance soul? Come, I show you the way!"
        ],
        conversations: [
          {
            id: 'about-metro',
            text: "Metro is HEART of Moscow! Deep underground, we create our own world - where dance echoes through tunnels!",
            responses: [
              { text: "Why the metro?", nextId: 'metro-significance' },
              { text: "What's special about underground dance?", nextId: 'underground-culture' },
              { text: "Show me the underground way", nextId: 'learning-request' }
            ]
          },
          {
            id: 'metro-significance',
            text: "Metro is Moscow's veins! Millions pass through, but few see the DANCE that flows beneath the city!",
            responses: [
              { text: "That's beautiful poetry", nextId: 'poetry-response' },
              { text: "I want to be part of this flow", nextId: 'learning-request' }
            ]
          },
          {
            id: 'underground-culture',
            text: "Underground dance is HONEST dance! No pretense, no audience - just you, the music, and the echoing tunnels!",
            responses: [
              { text: "That sounds pure", nextId: 'purity-response' },
              { text: "Teach me this honesty", nextId: 'learning-request' }
            ]
          },
          {
            id: 'learning-request',
            text: "Find the deepest stations, feel the rhythm of the trains, let Moscow's heartbeat become YOUR heartbeat!",
            responses: [
              { text: "Spasibo for the guidance", nextId: 'farewell' }
            ]
          },
          {
            id: 'poetry-response',
            text: "Russian soul is poetic soul! We see beauty in industrial, find art in everyday struggle!",
            responses: [
              { text: "I want to see with Russian eyes", nextId: 'learning-request' }
            ]
          },
          {
            id: 'purity-response',
            text: "Exactly! When no one watches, your dance becomes TRUTH!",
            responses: [
              { text: "I need that truth", nextId: 'learning-request' }
            ]
          },
          {
            id: 'farewell',
            text: "Udachi! Let the metro's rhythm guide your soul!"
          }
        ]
      }
    }
  ],
  'india-mumbai': [
    {
      id: 'bollywood-choreographer',
      name: 'Arjun "Bollywood Beast"',
      dialogues: {
        initial: [
          "Namaste! Welcome to Mumbai - where dreams meet DANCE! I've choreographed for biggest Bollywood films!",
          "You want to learn Indian Krump? It's FLASHY drama meets street soul!"
        ],
        conversations: [
          {
            id: 'about-bollywood-krump',
            text: "Bollywood gives us DRAMA and FLASHY expression, street gives us TRUTH! Together - pure MAGIC!",
            responses: [
              { text: "How do you blend them?", nextId: 'blending-styles' },
              { text: "What makes it special?", nextId: 'special-quality' },
              { text: "Teach me this fusion", nextId: 'training-offer' }
            ]
          },
          {
            id: 'blending-styles',
            text: "Start with Bollywood storytelling, add Krump's RAW emotion. Every move tells story, every story has POWER!",
            responses: [
              { text: "That's beautiful approach", nextId: 'beauty-response' },
              { text: "I want to tell stories", nextId: 'training-offer' }
            ]
          },
          {
            id: 'special-quality',
            text: "Indian dance is CELEBRATION of life! We bring joy, color, and SPIRITUAL energy to every movement!",
            responses: [
              { text: "How do I find that joy?", nextId: 'joy-advice' },
              { text: "Show me the celebration", nextId: 'training-offer' }
            ]
          },
          {
            id: 'training-offer',
            text: "Practice at Film City, learn from the masters! But remember - technique without HEART is just empty movement!",
            responses: [
              { text: "Dhanyawad for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'beauty-response',
            text: "Dance IS beautiful! When you move with purpose, with story, with SOUL - that's when magic happens!",
            responses: [
              { text: "I want to create magic", nextId: 'training-offer' }
            ]
          },
          {
            id: 'joy-advice',
            text: "Find what makes your heart SING! In India, we say dance is prayer in motion - let your joy be your prayer!",
            responses: [
              { text: "Beautiful philosophy", nextId: 'training-offer' }
            ]
          },
          {
            id: 'farewell',
            text: "Jai Ho! May your dance bring joy to millions!"
          }
        ]
      }
    },
    {
      id: 'street-sage',
      name: 'Priya "Street Sage"',
      dialogues: {
        initial: [
          "Sat Sri Akal! I've danced on Mumbai streets since childhood! Here, every corner has rhythm!",
          "You want real Mumbai experience? Street dance mixed with ancient wisdom!"
        ],
        conversations: [
          {
            id: 'about-street-wisdom',
            text: "Mumbai streets teach EVERYTHING! Chaos becomes rhythm, struggle becomes strength, survival becomes DANCE!",
            responses: [
              { text: "How does street teach dance?", nextId: 'street-lessons' },
              { text: "What about ancient wisdom?", nextId: 'ancient-wisdom' },
              { text: "I want to learn from streets", nextId: 'street-training' }
            ]
          },
          {
            id: 'street-lessons',
            text: "Street never lies! You learn to move with crowds, find space in chaos, make MUSIC from city noise!",
            responses: [
              { text: "That's incredible adaptation", nextId: 'adaptation-response' },
              { text: "Teach me this flow", nextId: 'street-training' }
            ]
          },
          {
            id: 'ancient-wisdom',
            text: "India is ANCIENT land! We have 5000 years of dance tradition - this wisdom flows in our blood!",
            responses: [
              { text: "How do you honor tradition?", nextId: 'tradition-honor' },
              { text: "Connect me to this wisdom", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'street-training',
            text: "Dance at train stations, in markets, wherever life FLOWS! Mumbai will teach you - just listen to her rhythm!",
            responses: [
              { text: "I'll listen to the city", nextId: 'farewell' }
            ]
          },
          {
            id: 'adaptation-response',
            text: "Exactly! Mumbai teaches FLEXIBILITY - like water finding its path through stones!",
            responses: [
              { text: "I want that flexibility", nextId: 'street-training' }
            ]
          },
          {
            id: 'tradition-honor',
            text: "By bringing RESPECT to new forms! Ancient wisdom guides, modern expression flows - perfect balance!",
            responses: [
              { text: "Show me this balance", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'wisdom-request',
            text: "Study classical forms, understand the SPIRIT, then let your street soul express it in new ways!",
            responses: [
              { text: "Dhanyawad, guru ji", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Rab rakha! May the streets guide your path!"
          }
        ]
      }
    }
  ],
  'australia-sydney': [
    {
      id: 'bondi-surfer-dancer',
      name: 'Shane "Wave Rider"',
      dialogues: {
        initial: [
          "G'day mate! Welcome to Sydney! Here we bring surf culture to street dance - it's WILD!",
          "You want to learn Aussie style? It's COCKY confidence with ocean flow!"
        ],
        conversations: [
          {
            id: 'about-aussie-style',
            text: "Aussie Krump is like surfing WAVES of rhythm! COCKY and FAST - we ride the beat like we ride the surf!",
            responses: [
              { text: "How does surfing influence dance?", nextId: 'surf-influence' },
              { text: "What's the Aussie attitude?", nextId: 'aussie-attitude' },
              { text: "Teach me to ride the rhythm", nextId: 'training-request' }
            ]
          },
          {
            id: 'surf-influence',
            text: "Surfing teaches BALANCE, TIMING, and respect for natural power! Same with dance - you don't fight the music, you FLOW with it!",
            responses: [
              { text: "That's beautiful philosophy", nextId: 'philosophy-response' },
              { text: "I want to learn this flow", nextId: 'training-request' }
            ]
          },
          {
            id: 'aussie-attitude',
            text: "We're laid-back but FIERCE! Fair dinkum confidence mixed with 'no worries' attitude - that's true blue Aussie style!",
            responses: [
              { text: "How do you balance laid-back and fierce?", nextId: 'balance-explanation' },
              { text: "I need that confidence", nextId: 'confidence-advice' }
            ]
          },
          {
            id: 'training-request',
            text: "Train at Bondi at sunrise! Feel the ocean's power, then bring that ENERGY to your movement!",
            responses: [
              { text: "Cheers mate!", nextId: 'farewell' }
            ]
          },
          {
            id: 'philosophy-response',
            text: "Too right! Ocean's been our teacher for thousands of years - respect the power, find your rhythm!",
            responses: [
              { text: "I want to learn from the ocean", nextId: 'training-request' }
            ]
          },
          {
            id: 'balance-explanation',
            text: "Easy mate! Be chill until it's time to go HARD! Like a croc - patient until it strikes!",
            responses: [
              { text: "That's wise strategy", nextId: 'training-request' }
            ]
          },
          {
            id: 'confidence-advice',
            text: "Believe in yourself like you believe the sun will rise! Aussie confidence comes from knowing you can handle ANYTHING!",
            responses: [
              { text: "I'll find that belief", nextId: 'training-request' }
            ]
          },
          {
            id: 'farewell',
            text: "No worries! May your dance flow like perfect waves!"
          }
        ]
      }
    },
    {
      id: 'aboriginal-elder',
      name: 'Billy "Dreamtime"',
      dialogues: {
        initial: [
          "Welcome, young one. I carry the oldest dance wisdom on this continent.",
          "Aboriginal people been dancing this land for 60,000 years. You want to understand TRUE movement?"
        ],
        conversations: [
          {
            id: 'about-dreamtime',
            text: "Dreamtime is when ancestors danced the world into being! Every movement connects to COUNTRY, to spirit, to eternity!",
            responses: [
              { text: "How do I connect to country?", nextId: 'country-connection' },
              { text: "What is spirit dance?", nextId: 'spirit-dance' },
              { text: "Teach me ancient wisdom", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'country-connection',
            text: "Feel the land beneath your feet! Every step connects to ancestors who walked here. Dance WITH the earth, not ON it!",
            responses: [
              { text: "How do I feel this connection?", nextId: 'connection-method' },
              { text: "That's profound wisdom", nextId: 'wisdom-response' }
            ]
          },
          {
            id: 'spirit-dance',
            text: "Spirit dance tells STORIES of creation! Your body becomes kangaroo, eagle, serpent - all creatures dance in you!",
            responses: [
              { text: "How do I become the animals?", nextId: 'animal-teaching' },
              { text: "Show me the stories", nextId: 'story-request' }
            ]
          },
          {
            id: 'wisdom-request',
            text: "Wisdom comes through LISTENING - to land, to elders, to the ancestors' voices in the wind!",
            responses: [
              { text: "I'll learn to listen", nextId: 'farewell' }
            ]
          },
          {
            id: 'connection-method',
            text: "Sit quiet on the earth, feel her heartbeat, let her rhythm become YOUR rhythm. This is first lesson!",
            responses: [
              { text: "I understand", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'wisdom-response',
            text: "Ancient wisdom never gets old, young one. It just waits for new hearts to understand!",
            responses: [
              { text: "My heart is open", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'animal-teaching',
            text: "Watch how kangaroo moves, how eagle soars! Each creature teaches different dance - you learn by OBSERVING!",
            responses: [
              { text: "I'll observe and learn", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'story-request',
            text: "Stories live in the dance itself! When you move with true spirit, the stories will dance THROUGH you!",
            responses: [
              { text: "I want the stories to flow", nextId: 'wisdom-request' }
            ]
          },
          {
            id: 'farewell',
            text: "Go well, young dancer. May the ancestors guide your steps!"
          }
        ]
      }
    }
  ],
  'mexico-mexicocity': [
    {
      id: 'lucha-libre-veteran',
      name: 'Carlos "El Luchador"',
      dialogues: {
        initial: [
          "¡Hola amigo! Welcome to Mexico City - where lucha libre meets KRUMP!",
          "Here we dance with WARRIOR spirit! BULLY and GOOFY - like masked fighters!"
        ],
        conversations: [
          {
            id: 'about-lucha-krump',
            text: "Lucha libre teaches us to be WARRIORS in the ring! Krump teaches us to be warriors on the floor! Same FIGHTING spirit!",
            responses: [
              { text: "How do they connect?", nextId: 'connection-explanation' },
              { text: "Teach me warrior spirit", nextId: 'warrior-training' },
              { text: "¡Órale! Sounds intense", nextId: 'farewell' }
            ]
          },
          {
            id: 'connection-explanation',
            text: "Both are about HONOR, about fighting for what you believe! Every move tells story of struggle and VICTORY!",
            responses: [
              { text: "I want to learn this honor", nextId: 'warrior-training' }
            ]
          },
          {
            id: 'warrior-training',
            text: "Train like luchador - with PASSION, with PRIDE! Let your dance be your mask, your moves be your signature!",
            responses: [
              { text: "¡Gracias, maestro!", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "¡Que viva la lucha! May your dance have warrior's heart!"
          }
        ]
      }
    }
  ],
  'egypt-cairo': [
    {
      id: 'pharaoh-mystic',
      name: 'Hassan "Desert Storm"',
      dialogues: {
        initial: [
          "Ahlan wa sahlan! Welcome to Cairo - where ancient power meets street dance!",
          "The pyramids hold SECRETS of movement. You ready to learn pharaoh's dance?"
        ],
        conversations: [
          {
            id: 'about-ancient-power',
            text: "Ancient Egyptians knew dance was MAGIC! Every hieroglyph shows movement - they danced creation itself!",
            responses: [
              { text: "How do I tap into this power?", nextId: 'power-access' },
              { text: "Teach me ancient secrets", nextId: 'ancient-training' }
            ]
          },
          {
            id: 'power-access',
            text: "Feel the DESERT in your soul! Let the Nile's rhythm flow through you! Ancient power never died - it waits!",
            responses: [
              { text: "I want to awaken it", nextId: 'ancient-training' }
            ]
          },
          {
            id: 'ancient-training',
            text: "Dance under the stars like pharaohs did! Let pyramid's energy charge your movement!",
            responses: [
              { text: "Shukran for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Ma'a salama! May ancient power guide your steps!"
          }
        ]
      }
    }
  ],
  'canada-toronto': [
    {
      id: 'cn-tower-dancer',
      name: 'Alex "Maple Leaf"',
      dialogues: {
        initial: [
          "Hey there, eh! Welcome to Toronto - the most multicultural city in the world!",
          "Our Krump brings together EVERY culture! RUGGED and FAST like our winters!"
        ],
        conversations: [
          {
            id: 'about-multiculture',
            text: "Toronto is BEAUTIFUL mosaic! Every culture brings something to our dance - that's what makes us STRONG!",
            responses: [
              { text: "How do you blend so many styles?", nextId: 'blending-cultures' },
              { text: "What's uniquely Canadian?", nextId: 'canadian-identity' }
            ]
          },
          {
            id: 'blending-cultures',
            text: "Respect EVERYONE's contribution! Take the best from each tradition, honor the source, create something NEW!",
            responses: [
              { text: "That's beautiful philosophy", nextId: 'farewell' }
            ]
          },
          {
            id: 'canadian-identity',
            text: "We're tough but POLITE! Strong but INCLUSIVE! That's the Canadian way - and that's our dance!",
            responses: [
              { text: "Thanks for sharing, eh!", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Take care, and keep dancing with that Canadian spirit!"
          }
        ]
      }
    }
  ],
  'italy-rome': [
    {
      id: 'renaissance-artist',
      name: 'Lorenzo "Il Maestro"',
      dialogues: {
        initial: [
          "Ciao! Welcome to Roma - where art and passion meet in dance!",
          "We bring Renaissance beauty to street power! TECHNICAL precision with Italian SOUL!"
        ],
        conversations: [
          {
            id: 'about-renaissance-krump',
            text: "Like Michelangelo carved David, we carve PERFECTION in movement! Art and street - perfetta combinazione!",
            responses: [
              { text: "How do you make street dance artistic?", nextId: 'artistic-approach' },
              { text: "Teach me this beauty", nextId: 'art-training' }
            ]
          },
          {
            id: 'artistic-approach',
            text: "Every movement must have PURPOSE, like brushstroke on canvas! Technical skill with passionate ANIMA!",
            responses: [
              { text: "I want to paint with movement", nextId: 'art-training' }
            ]
          },
          {
            id: 'art-training',
            text: "Study the masters - Bernini, Caravaggio! Feel their passion, then express it through KRUMP!",
            responses: [
              { text: "Grazie mille, maestro!", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Arrivederci! May your dance be a masterpiece!"
          }
        ]
      }
    }
  ],
  'south-africa-capetown': [
    {
      id: 'township-elder',
      name: 'Mandla "Ubuntu Spirit"',
      dialogues: {
        initial: [
          "Sawubona! Welcome to Cape Town - where Ubuntu spirit meets street dance!",
          "We dance for COMMUNITY, for healing, for FREEDOM! You ready for township power?"
        ],
        conversations: [
          {
            id: 'about-ubuntu',
            text: "Ubuntu means 'I am because WE are!' Our dance is never solo - it's community CELEBRATION!",
            responses: [
              { text: "How does community shape dance?", nextId: 'community-dance' },
              { text: "Teach me Ubuntu spirit", nextId: 'ubuntu-training' }
            ]
          },
          {
            id: 'community-dance',
            text: "When you dance for others, your power MULTIPLIES! Township taught us - together we are UNSTOPPABLE!",
            responses: [
              { text: "I want to dance for community", nextId: 'ubuntu-training' }
            ]
          },
          {
            id: 'ubuntu-training',
            text: "Dance with your HEART open! Feel the ancestors, feel the community - let Ubuntu flow through you!",
            responses: [
              { text: "Ngiyabonga for the wisdom", nextId: 'farewell' }
            ]
          },
          {
            id: 'farewell',
            text: "Hamba kahle! May Ubuntu guide your dance!"
          }
        ]
      }
    }
  ]
};