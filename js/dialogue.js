var houseLine = [
    "Florence!",
    "Ah, there you are. Do you still have my watch that you borrowed for the Atkinson case?",
    "Select the watch from your bag to return it to your grandfather.",
    "Oh wonderful! Thank you my dear.",
    "Ooh why that reminds me, we received a wire from Constable Perkins. He needs your help!",
    "We have no time to lose, lets go."
];

var crimeSceneOneLine = [
    "Mister Merkitt, Florence, thank you for coming.",
    "What have we got?",
    "Alma Graves, scullery maid of Baron Abraham Baitman.",
    "How did she die?",
    "I was hoping you could find that out.",
    "There's a small incision roughly the size of a shilling in her abdomen.",
    "But that's not all...",
    "There appears to be some discolouration about the face, we suspect poison.",
    "However, that's your area, so have a look and come to me when you have all the data.",
    "Select the body to enter 'Search Mode'"
];

var crimeSceneTwoLine = [
    "Do you think you can identify the poison with your books?",
    "Search the books for information pertaining to the clues in your bag, and select the poison that may have been used.\nYou can use the magnifying glass icon next to the clues to learn more about them.",
    "I believe in all likelihood that Miss Graves died having ingested Aconitum napellus, also known as Monkshood.",
    "So she died from the poison? What about the gouge in her abdomen?",
    "Do you see these hoof marks in the soil? They are fresh.",
    "I believe Miss Graves was staggering about in a confused state, she attracted the attention of a bull that had escaped,\nor been set free, from one of the neighbouring fields.",
    "So you're saying a bull charged her, left her in a pool of her own blood, but didn't kill her?",
    "Oh Constable Perkins, she was dead long before the bull got to her, she just didn't know it yet.",
    "Eh?",
    "Monkshood is absolutely lethal. It will cause nausea, a burning sensation in the face, confusion, dizziness and sweating\nimmediately after ingestion.",
    "Within hours the victim will be dead.",
    "Asphyxia caused by paralysis of the heart and lungs.",
    "Well done, dear! Your mother would be so proud of you.",
    "I see...",
    "Well, are you satisfied that you've seen everything you wanted, or would you like to check and make sure you didn't miss\nany clues?",
    "Not quite yet, I would like to make sure I didn't miss anything.",
    "As you wish.",
    "",
    "Yes, now I would like to talk to this Abraham Baitman. I think it's time for a confrontation.",
    ""
];

var crimeSceneRestLine = [
    "Well, are you satisfied that you've seen everything you wanted?",
    "Not quite yet, I would like to make sure I didn't miss anything.",
    "As you wish.",
    "",
    "Yes, now I would like to talk to this Abraham Baitman. I think it's time for a confrontation.",
    ""
];

var confrontationLine = [
    "Baron Abraham Baitman, I understand.",
    "My name is Constable Perkins, and this is Jonathan Merkitt and his granddaughter Florence.",
    "Good afternoon.",
    "How do you do.",
    "Hello. Now how can I help you?",
    "We're investigating the death of your scullery maid, a Miss Alma Graves.",
    "Ah yes, sweet little Alma. I do hope you're giving the case your full attention.",
    "Indeed. To tell the truth I think we've solved it.",
    "What?",
    "Yes, I've just been over to the crime scene, I do believe I can fit the pieces together nicely.",
    "I see. Well, good! So how did it happen?",
    "Present the clues in the correct order to complete the sequence of events. Three mistakes and you lose."
];
var presentPoisonedLine = [
    "Miss Graves died from asphyxiation having been poisoned with Monkshood.",
    "Poison? Well that seems unlikely, what about the wound in her torso?",
    "She was stabbed by this key!",
    "That's... ridiculous...",
    "Yes... it is... I don't know why I said it.",
    "Alma was eaten alive by maggots.",
    "Can that happen?!",
    "Um, actually no...",
    "She died of shock after reading this note.",
    "... But she was already at the pasture...",
    "Ah!",
    "This is what killed her!",
    "Are you suggesting she was papercut to death?",
    "No, yes I see how stupid that is now.",
    "She was gored by a bull.",
    "Oh! So why are you talking to me, go get the owner!",
    "No, wait, that wasn't it."
];

var presentHoofLine = [
    "That was caused by a bull, having somehow found its way out of its field.",
    "And you don't see that as a more likely candidate for a cause of death?",
    "Oh it may have contributed to her demise, but there were small red spots in her eyes, and a blue pigmentation to her lips.",
    "Both classic signs of asphyxiation.",
    "Ah. Well why was she out there if she was poisoned?",
    "She was reading this note and hated it so much she stabbed herself!",
    "Really?",
    "No.",
    "This letter folded the wrong way and sank itself into her stomach.",
    "But it's just paper, it could never do any harm to anybody.",
    "Hmm, you're right.",
    "These maggots burrowed into her.",
    "I didn't even know they were strong enough do that.",
    "They're not, I made that up.",
    "She tripped and fell onto this key that she was holding.",
    "Doesn't seem very plausible to me.",
    "No, nor to me."
];

var presentNoteLine = [
    "Well I found this note. I believe it was blown from her pocket, or more likely her hand, by the wind.",
    "Blown... from her hand... by the wind...",
    "Yes. Would you like me to read it to you?",
    "Oh, that won't be...",
    "'Alma, meet me by the pasture at 8 o'clock. Your secret admirer'",
    "I believe in her confused state she found herself wandering to the only destination she could think of.",
    "How curious! I wonder who this 'secret admirer' could be?",
    "Perhaps she was frolicking with joy at the thought of this letter.",
    "Oh no, Alma was always a very sensible and reserved girl.",
    "I see...",
    "Maybe she was looking for these maggots that were on her body.",
    "Do you honestly consider that a posibility?",
    "I... no, I don't",
    "Off to carve trees with this key perhaps.",
    "What a ridiculous notion.",
    "Yes, I suppose it is a bit."
];

var presentLetterLine = [
    "I would also wonder, were it not for this letter of recommendation I found laying by her.",
    "It seems that Miss Graves was to leave your employment to join your neighbour's household.",
    "Indeed, she informed me of her intention to leave and asked me if I would be so kind as to write a letter of recommendation.",
    "But I'm afraid I don't see what this has to do with anything, after all, she's only been dead for a couple of hours, no?",
    "Perhaps your gardener? Is it possible that he enclosed these maggots in the letter as a hint?",
    "I do not have a gardener. Such a past time is one in which I take great joy myself.",
    "Well it couldn't be that, then.",
    "Perhaps a local locksmith? He may have sent her this key as a token of his appreciation.",
    "No chance, the local locksmith is coming on 60 years of age, and is married.",
    "I suppose it wouldn't be him, in that case.",
];

var presentMaggotLine = [
    "These maggots indicate that Miss Graves was out in that field for 1-2 days.",
    "So why did we only get notified this morning of her absence?",
    "I don't take too kindly to what you are insinuating, young lady. Who do you think I am?",
    "This key is very old, she's clearly been dead for a while.",
    "How on EARTH does that logic work?",
    "I have no idea."
];

var win = [
    "Oh, I nearly forgot, I found this.",
    "That's... my key, my key to my bedroom... I've been looking for that for days.",
    "Yes, I thought as much.",
    "Which is why you, Baron Baitman, are under arrest for the murder of Miss Alma Graves.",
    "WHAT?!",
    "Allow me to relay to you all what happened. Do correct me if I make any mistakes, Baron.",
    "At first you saw Alma as just your servent girl, never paying her much notice.",
    "Until, that is, one day you started to fall in love with the young lady. Perfectly understandable, her being such a\nhandsome woman.",
    "You two had your fun, until one day when she told you that she would be leaving your employ to join that of Lord Holdhurst.",
    "You couldn't bear to watch her slip through your fingers.",
    "Soon, despair turned to anger, and if you couldn't have her, no one could.",
    "You poisoned her drink with Monkshood, and sent her an anonymous note inviting her into the fields, where you were\nhoping her body would remain undiscovered until decayed beyond recognition.",
    "...",
    "...",
    "...",
    "Am I wrong?",
    "No... you're absolutely right in every particular.",
    "I have nothing to say.",
    ""
];

var lose = [
    "Oh this is intollerable. Come back when you've got some sense in your head.",
    "Such a matter being treated so clumsily is better left untouched.",
    "You can see yourselves out."
];

var loseMiss = [
    "I... I don't know.",
    "Oh this is intollerable. Come back when you've got some sense in your head.",
    "Such a matter being treated so clumsily is better left untouched.",
    "You can see yourselves out."
];
