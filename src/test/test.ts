import { expect } from "chai";
import { describe } from "mocha";
import { Deck, DeckProfile } from "../deck";

const ydk =
	"#created by AlphaKretin\n#main\n99249638\n99249638\n46659709\n46659709\n46659709\n65367484\n65367484\n65367484\n43147039\n30012506\n30012506\n30012506\n77411244\n77411244\n77411244\n3405259\n3405259\n3405259\n89132148\n39890958\n14558127\n14558127\n14558127\n32807846\n73628505\n12524259\n12524259\n12524259\n24224830\n24224830\n24224830\n80352158\n80352158\n80352158\n66399653\n66399653\n66399653\n10045474\n10045474\n10045474\n#extra\n1561110\n10443957\n10443957\n58069384\n58069384\n73289035\n581014\n21887175\n4280258\n38342335\n2857636\n75452921\n50588353\n83152482\n65741786\n!side\n";
const url =
	"ydke://5m3qBeZt6gV9+McCffjHAn34xwK8beUDvG3lA7xt5QMfX5ICWvTJAVr0yQFa9MkBrDOdBKwznQSsM50Ey/UzAMv1MwDL9TMAdAxQBQ6wYAKvI94AryPeAK8j3gCmm/QBWXtjBOMavwDjGr8A4xq/AD6kcQE+pHEBPqRxAZ4TygSeE8oEnhPKBKUt9QOlLfUDpS31AyJImQAiSJkAIkiZAA==!FtIXALVcnwC1XJ8AiBF2A4gRdgNLTV4Elt0IAMf4TQHCT0EAvw5JAqSaKwD5UX8EweoDA2LO9ATaI+sD!!";

describe("Deck", function () {
	it("#constructFromYdk", async function () {
		const deck = await Deck.constructFromYdk(ydk);
		expect(deck.ydk).to.equal(ydk);
		expect(deck.url).to.equal(url);
	});
	it("#constructFromUrl", async function () {
		const deck = Deck.constructFromUrl(url);
		const deckYdk = deck.ydk.split("\n").slice(1).join("\n");
		const altYdk = ydk.split("\n").slice(1).join("\n");
		expect(deck.url).to.equal(url);
		expect(deckYdk).to.equal(altYdk);
	});
	it("#getProfile", async function () {
		const deck = await Deck.constructFromYdk(ydk);
		const profile = await deck.getProfile();
		const exampleProfile: DeckProfile = {
			nameCounts: {
				main: {
					"Union Driver": 2,
					"Galaxy Soldier": 3,
					"Photon Thrasher": 3,
					"Photon Vanisher": 1,
					"A-Assault Core": 3,
					"B-Buster Drake": 3,
					"C-Crush Wyvern": 3,
					"Photon Orbital": 1,
					"Heavy Mech Support Armor": 1,
					"Ash Blossom & Joyous Spring": 3,
					"Reinforcement of the Army": 1,
					Terraforming: 1,
					"Unauthorized Reactivation": 3,
					"Called by the Grave": 3,
					"Magnet Reverse": 3,
					"Union Hangar": 3,
					"Infinite Impermanence": 3
				},
				extra: {
					"ABC-Dragon Buster": 1,
					"Cyber Dragon Infinity": 2,
					"Cyber Dragon Nova": 2,
					"Bujintei Tsukuyomi": 1,
					"Daigusto Emeral": 1,
					"Mekk-Knight Crusadia Avramax": 1,
					"Apollousa, Bow of the Goddess": 1,
					"Knightmare Unicorn": 1,
					"Knightmare Phoenix": 1,
					"Knightmare Cerberus": 1,
					"Crystron Halqifibrax": 1,
					"Union Carrier": 1,
					"I:P Masquerena": 1
				},
				side: {}
			},
			typeCounts: {
				main: {
					monster: 23,
					spell: 14,
					trap: 3
				},
				extra: {
					fusion: 1,
					xyz: 6,
					synchro: 0,
					link: 8
				},
				side: {
					monster: 0,
					spell: 0,
					trap: 0
				}
			},
			archetypes: [],
			url: url,
			ydk: ydk
		};
		expect(profile).to.deep.equal(exampleProfile);
	});
	it("#validate (passing)", async function () {
		const deck = Deck.constructFromUrl(url);
		const result = await deck.validate();
		expect(result.length).to.equal(0);
	});
	it("#validate (failing)", async function () {
		const altUrl =
			"ydke://M/D5BTPw+QUz8PkFM/D5BTTw+QU08PkFNPD5BTXw+QU18PkFNfD5BZAGIwCQBiMAJpBCAyaQQgMmkEID1XzQA9V80APVfNADJusABCbrAAQm6wAEWXtjBDvw+QU78PkFO/D5BTzw+QU88PkFPfD5BT3w+QU98PkFIkiZACJImQAiSJkAb3bvAG927wBvdu8A+wR4AvsEeAL7BHgC!NvD5BTbw+QU58PkFOfD5BTjw+QU48PkFN/D5BTrw+QXH+E0BpJorAL8OSQI=!!";
		const deck = Deck.constructFromUrl(altUrl);
		const result = await deck.validate();
		expect(result).to.contain("Main Deck too small! Should be at least 40, is 39.");
		expect(result).to.contain("Too many copies of Appliancer Socketroll! Should be at most 3, is 4.");
		expect(result).to.contain("Too many copies of One for One! Should be at most 1, is 2.");
	});
});
