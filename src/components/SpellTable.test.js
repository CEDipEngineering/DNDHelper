import React from "react";
import { shallow } from "enzyme";
import SpellTabel from "./SpellTable";
import { Input, Button } from "./SpellTable";
import Enzyme from "enzyme";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from"enzyme-to-json";

describe('SpellTabel', () => {
    it ("Randering pageSpells with classes Filter", () => {
        const props = {
            classes_filter: [
                {class: 'Barbarian', checked: false}, 
                {class: 'Bard', checked: false}, 
                {class: 'Cleric', checked: false}, 
                {class: 'Druid',   checked: false}, 
                {class: 'Fighter', checked: false}, 
                {class: 'Monk', checked: false},
                {class: 'Paladin', checked: false},
                {class: 'Ranger', checked: false},
                {class: 'Rogue', checked: false}, 
                {class: 'Sorcerer', checked: true},
                {class: 'Warlock', checked: false},
                {class: 'Wizard', checked: false} 
            ],
            schools_filter: [
                {school: 'Conjuration', checked: true}, 
                {school: 'Necromancy', checked: true}, 
                {school: 'Evocation', checked: true}, 
                {school: 'Abjuration',   checked: true}, 
                {school: 'Transmutation', checked: true}, 
                {school: 'Divination', checked: true},
                {school: 'Enchantment', checked: true},
                {school: 'Illusion', checked: true}
            ],
            levels_filter: [
                {level: '1st-level', checked: true}, 
                {level: '2nd-level', checked: true}, 
                {level: '3rd-level', checked: true}, 
                {level: '4th-level', checked: true}, 
                {level: '5th-level', checked: true}, 
                {level: '6th-level', checked: true}, 
                {level: '7th-level', checked: true},
                {level: '8th-level', checked: true},
                {level: 'Cantrip', checked: true} 
            ],
            spellInfo: [
                {archetype: "Druid: Swamp",
                casting_time: "1 action",
                circles: "Swamp",
                components: "V, S, M",
                concentration: "no",
                desc: "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
                dnd_class: "Druid, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Instantaneous",
                higher_level: "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
                level: "2nd-level",
                level_int: 2,
                material: "Powdered rhubarb leaf and an adder's stomach.",
                name: "Acid Arrow",
                page: "phb 259",
                range: "90 feet",
                ritual: "no",
                school: "Evocation",
                slug: "acid-arrow"},

                {archetype: "",
                casting_time: "1 action",
                circles: "",
                components: "V, S",
                concentration: "no",
                desc: "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a dexterity saving throw or take 1d6 acid damage. This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
                dnd_class: "Sorcerer, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Instantaneous",
                higher_level: "",
                level: "Cantrip",
                level_int: 0,
                material: "",
                name: "Acid Splash",
                page: "phb 211",
                range: "60 feet",
                ritual: "no",
                school: "Conjuration",
                slug: "acid-splash"},
        
            ],
            allCallbacks:{filter:[]}  
        }

        const wrapper = shallow(
            <SpellTabel {...props}/>
        );
        expect(wrapper.find('a').at(0).text()).toEqual("Acid Splash")
    });

    it ("Randering pageSpells with schools Filter", () => {
        const props = {
            classes_filter: [
                {class: 'Barbarian', checked: true}, 
                {class: 'Bard', checked: true}, 
                {class: 'Cleric', checked: true}, 
                {class: 'Druid',   checked: true}, 
                {class: 'Fighter', checked: true}, 
                {class: 'Monk', checked: true},
                {class: 'Paladin', checked: true},
                {class: 'Ranger', checked: true},
                {class: 'Rogue', checked: true}, 
                {class: 'Sorcerer', checked: true},
                {class: 'Warlock', checked: true},
                {class: 'Wizard', checked: true} 
            ],
            schools_filter: [
                {school: 'Conjuration', checked: false}, 
                {school: 'Necromancy', checked: true}, 
                {school: 'Evocation', checked: false}, 
                {school: 'Abjuration',   checked: false}, 
                {school: 'Transmutation', checked: false}, 
                {school: 'Divination', checked: false},
                {school: 'Enchantment', checked: false},
                {school: 'Illusion', checked: false}
            ],
            levels_filter: [
                {level: '1st-level', checked: true}, 
                {level: '2nd-level', checked: true}, 
                {level: '3rd-level', checked: true}, 
                {level: '4th-level', checked: true}, 
                {level: '5th-level', checked: true}, 
                {level: '6th-level', checked: true}, 
                {level: '7th-level', checked: true},
                {level: '8th-level', checked: true},
                {level: 'Cantrip', checked: true} 
            ],
            spellInfo: [
                {archetype: "",
                casting_time: "1 action",
                circles: "",
                components: "V, S, M",
                concentration: "yes",
                desc: "A 10-foot-radius invisible sphere of antimagic surrounds you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can't be cast, summoned creatures disappear, and even magic items become mundane. Until the spell ends, the sphere moves with you, centered on you. Spells and other magical effects, except those created by an artifact or a deity, are suppressed in the sphere and can't protrude into it. A slot expended to cast a suppressed spell is consumed. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration.↵↵**Targeted Effects.** Spells and other magical effects, such as magic missile and charm person, that target a creature or an object in the sphere have no effect on that target.↵↵**Areas of Magic.** The area of another spell or magical effect, such as fireball, can't extend into the sphere. If the sphere overlaps an area of magic, the part of the area that is covered by the sphere is suppressed. For example, the flames created by a wall of fire are suppressed within the sphere, creating a gap in the wall if the overlap is large enough.↵↵**Spells.** Any active spell or other magical effect on a creature or an object in the sphere is suppressed while the creature or object is in it.↵↵**Magic Items.** The properties and powers of magic items are suppressed in the sphere. For example, a +1 longsword in the sphere functions as a nonmagical longsword. A magic weapon's properties and powers are suppressed if it is used against a target in the sphere or wielded by an attacker in the sphere. If a magic weapon or a piece of magic ammunition fully leaves the sphere (for example, if you fire a magic arrow or throw a magic spear at a target outside the sphere), the magic of the item ceases to be suppressed as soon as it exits.↵↵**Magical Travel.** Teleportation and planar travel fail to work in the sphere, whether the sphere is the destination or the departure point for such magical travel. A portal to another location, world, or plane of existence, as well as an opening to an extradimensional space such as that created by the rope trick spell, temporarily closes while in the sphere.↵↵**Creatures and Objects.** A creature or object summoned or created by magic temporarily winks out of existence in the sphere. Such a creature instantly reappears once the space the creature occupied is no longer within the sphere.↵↵**Dispel Magic.** Spells and magical effects such as dispel magic have no effect on the sphere. Likewise, the spheres created by different antimagic field spells don't nullify each other.",
                dnd_class: "Cleric, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Up to 1 hour",
                higher_level: "",
                level: "8th-level",
                level_int: 8,
                material: "A pinch of powdered iron or iron filings.",
                name: "Antimagic Field",
                page: "phb 213",
                range: "Self",
                ritual: "no",
                school: "Abjuration",
                slug: "antimagic-field"},

                {archetype: "",
                casting_time: "1 minute",
                circles: "",
                components: "V, S, M",
                concentration: "no",
                desc: "This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature. The target becomes a skeleton if you chose bones or a zombie if you chose a corpse (the DM has the creature's game statistics). ↵↵On each of your turns, you can use a bonus action to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete. ↵↵The creature is under your control for 24 hours, after which it stops obeying any command you've given it. To maintain control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell, rather than animating a new one.",
                dnd_class: "Cleric, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Instantaneous",
                higher_level: "When you cast this spell using a spell slot of 4th level or higher, you animate or reassert control over two additional undead creatures for each slot level above 3rd. Each of the creatures must come from a different corpse or pile of bones.",
                level: "3rd-level",
                level_int: 3,
                material: "A drop of blood, a piece of flesh, and a pinch of bone dust.",
                name: "Animate Dead",
                page: "phb 212",
                range: "10 feet",
                ritual: "no",
                school: "Necromancy",
                slug: "animate-dead"}
        
            ],
            allCallbacks:{filter:[]}  
        }

        const wrapper = shallow(
            <SpellTabel {...props}/>
        );
        expect(wrapper.find('a').at(0).text()).toEqual("Animate Dead")
    });

    it ("Randering pageSpells with levels Filter", () => {
        const props = {
            classes_filter: [
                {class: 'Barbarian', checked: true}, 
                {class: 'Bard', checked: true}, 
                {class: 'Cleric', checked: true}, 
                {class: 'Druid',   checked: true}, 
                {class: 'Fighter', checked: true}, 
                {class: 'Monk', checked: true},
                {class: 'Paladin', checked: true},
                {class: 'Ranger', checked: true},
                {class: 'Rogue', checked: true}, 
                {class: 'Sorcerer', checked: true},
                {class: 'Warlock', checked: true},
                {class: 'Wizard', checked: true} 
            ],
            schools_filter: [
                {school: 'Conjuration', checked: true}, 
                {school: 'Necromancy', checked: true}, 
                {school: 'Evocation', checked: true}, 
                {school: 'Abjuration',   checked: true}, 
                {school: 'Transmutation', checked: true}, 
                {school: 'Divination', checked: true},
                {school: 'Enchantment', checked: true},
                {school: 'Illusion', checked: true}
            ],
            levels_filter: [
                {level: '1st-level', checked: false}, 
                {level: '2nd-level', checked: false}, 
                {level: '3rd-level', checked: false}, 
                {level: '4th-level', checked: false}, 
                {level: '5th-level', checked: true}, 
                {level: '6th-level', checked: false}, 
                {level: '7th-level', checked: false},
                {level: '8th-level', checked: false},
                {level: 'Cantrip', checked: false} 
            ],

            spellInfo: [
                {archetype: "Cleric: Knowledge",
                casting_time: "1 action",
                circles: "",
                components: "V, S, M",
                concentration: "yes",
                desc: "You create an invisible, magical eye within range that hovers in the air for the duration. You mentally receive visual information from the eye, which has normal vision and darkvision out to 30 feet. The eye can look in every direction. As an action, you can move the eye up to 30 feet in any direction. There is no limit to how far away from you the eye can move, but it can't enter another plane of existence. A solid barrier blocks the eye's movement, but the eye can pass through an opening as small as 1 inch in diameter.",
                dnd_class: "Cleric, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Up to 1 hour",
                higher_level: "",
                level: "4th-level",
                level_int: 4,
                material: "A bit of bat fur.",
                name: "Arcane Eye",
                page: "phb 214",
                range: "30 feet",
                ritual: "no",
                school: "Divination",
                slug: "arcane-eye"},

                {archetype: "",
                casting_time: "1 action",
                circles: "",
                components: "V, S",
                concentration: "yes",
                desc: "Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points. ↵As a bonus action, you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.↵### Animated Object Statistics ↵| Size | HP | AC | Attack | Str | Dex |↵|--------|----|----|----------------------------|-----|-----|↵| Tiny | 20 | 18 | +8 to hit, 1d4 + 4 damage | 4 | 18 |↵| Small | 25 | 16 | +6 to hit, 1d8 + 2 damage | 6 | 14 |↵| Medium | 40 | 13 | +5 to hit, 2d6 + 1 damage | 10 | 12 |↵| Large | 50 | 10 | +6 to hit, 2d10 + 2 damage | 14 | 10 |↵| Huge | 80 | 10 | +8 to hit, 2d12 + 4 damage | 18 | 6 | ↵↵An animated object is a construct with AC, hit points, attacks, Strength, and Dexterity determined by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form. If you command an object to attack, it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determined by its size. The DM might rule that a specific object inflicts slashing or piercing damage based on its form.",
                dnd_class: "Bard, Sorcerer, Wizard",
                document__license_url: "http://open5e.com/legal",
                document__slug: "wotc-srd",
                document__title: "Systems Reference Document",
                duration: "Up to 1 minute",
                higher_level: "If you cast this spell using a spell slot of 6th level or higher, you can animate two additional objects for each slot level above 5th.",
                level: "5th-level",
                level_int: 5,
                material: "",
                name: "Animate Objects",
                page: "phb 213",
                range: "120 feet",
                ritual: "no",
                school: "Transmutation",
                slug: "animate-objects"}
        
            ],
            allCallbacks:{filter:[]}  
        }

        const wrapper = shallow(
            <SpellTabel {...props}/>
        );
        expect(wrapper.find('a').at(0).text()).toEqual("Animate Objects")
    });

    it ("Randering pageSpells with no Spells or Filter", () => {
        const props = {
            spellInfo: [],
            allCallbacks:{filter:[]}
        }

        const wrapper = shallow(
            <SpellTabel {...props}/>
          );
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it ("Randering pageSpells with one spell and no Filter", () => {
        const props = { 
            spellInfo: {archetype: "Druid: Swamp",
            casting_time: "1 action",
            circles: "Swamp",
            components: "V, S, M",
            concentration: "no",
            desc: "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.",
            dnd_class: "Druid, Wizard",
            document__license_url: "http://open5e.com/legal",
            document__slug: "wotc-srd",
            document__title: "Systems Reference Document",
            duration: "Instantaneous",
            higher_level: "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
            level: "2nd-level",
            level_int: 2,
            material: "Powdered rhubarb leaf and an adder's stomach.",
            name: "Acid Arrow",
            page: "phb 259",
            range: "90 feet",
            ritual: "no",
            school: "Evocation",
            slug: "acid-arrow"},

            allCallbacks:{filter:[]}}  

        const wrapper = shallow(
            <SpellTabel {...props}/>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    if ("Randering page when clicking next button", () =>{

        const props = {
            spellInfo: {slug: "acid-arrow"},
            allCallbacks:{filter:[],
                          next:true}
        }     

        const wrapper = shallow(
            <SpellTabel {...props}/>
            )
        expect(toJson(wrapper)).toMatchSnapshot()
    });



});