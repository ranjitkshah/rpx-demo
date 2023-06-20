import Cr1msonAvenger from '../resources/images/coins/Cr1msonAvenger.png'
import Cr1msonAvengerText from '../resources/images/coins/Cr1msonAvengerText.png'
import D3athBlow from '../resources/images/coins/D3athBlow.png'
import D3athBlowText from '../resources/images/coins/D3athBlowText.png'
import DarkNightm4re from '../resources/images/coins/DarkNightm4re.png'
import DarkKnightm4reText from '../resources/images/coins/DarkKnightm4reText.png'
import FuryFight3r from '../resources/images/coins/FuryFight3r.png'
import FuryFight3rText from '../resources/images/coins/FuryFight3rText.png'
import Infern0Assassin from '../resources/images/coins/Infern0Assassin.png'
import Infern0AssassinText from '../resources/images/coins/Infern0AssassinText.png'
import NightHunter from '../resources/images/coins/NightHunter.png'
import NightHunterText from '../resources/images/coins/NightHunterText.png'
import R0gueRider from '../resources/images/coins/R0gueRider.png'
import R0gueRiderText from '../resources/images/coins/R0gueRiderText.png'
import StealthSniper from '../resources/images/coins/StealthSniper.png'
import StealthSniperText from '../resources/images/coins/StealthSniperText.png'
import ThunderB0ltz from '../resources/images/coins/ThunderB0ltz.png'
import ThunderB0ltzText from '../resources/images/coins/ThunderB0ltzText.png'
import TitanWarrior188 from '../resources/images/coins/TitanWarrior188.png'
import TitanWarrior188Text from '../resources/images/coins/TitanWarrior188Text.png'
import { StaticImageData } from 'next/image'

export const currentCoinCreatorNames = [
	'Ch40sQueen',
	'Cr1msonAvenger',
	'D3athBlow',
	'DarkNightm4re',
	'FuryFight3r',
	'Infern0Assassin',
	'NightHunter',
	'R0gueRider',
	'StealthSniper',
	'ThunderB0ltz',
	'TitanWarrior188'
]

export const coinsImageNameMap = {
	Cr1msonAvenger: Cr1msonAvengerText,
	D3athBlow: D3athBlowText,
	DarkNightm4re: DarkKnightm4reText,
	FuryFight3r: FuryFight3rText,
	Infern0Assassin: Infern0AssassinText,
	NightHunter: NightHunterText,
	R0gueRider: R0gueRiderText,
	StealthSniper: StealthSniperText,
	ThunderB0ltz: ThunderB0ltzText,
	TitanWarrior188: TitanWarrior188Text
}

export const coinsImageMap: { [key: string]: StaticImageData } = {
	Cr1msonAvenger,
	D3athBlow,
	DarkNightm4re,
	FuryFight3r,
	Infern0Assassin,
	NightHunter,
	R0gueRider,
	StealthSniper,
	ThunderB0ltz,
	TitanWarrior188
}
