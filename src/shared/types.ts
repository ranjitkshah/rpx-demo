import { NextApiRequest, NextApiResponse } from 'next'
import { Send } from 'express-serve-static-core'
import { OAuthProvider } from '@clerk/nextjs/dist/api'

export enum CollectionNames {
	USERS = 'users',
	COINS = 'coins'
}

export enum APIStatuses {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR'
}

export enum APIMethods {
	POST = 'POST',
	GET = 'GET',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

export enum GeneralAPIResponses {
	FAILURE = 'FAILURE',
	INVALID_REQUEST_TYPE = 'INVALID_REQUEST_TYPE'
}

export enum DocumentResponses {
	DATA_FOUND = 'DATA_FOUND',
	DATA_NOT_FOUND = 'DATA_NOT_FOUND',
	DATA_DELETED = 'DATA_DELETED',
	DATA_UPDATED = 'DATA_UPDATED',
	DATA_CREATED = 'DATA_CREATED',
	DATA_NOT_CREATED = 'DATA_NOT_CREATED'
}

export enum SignupMethods {
	GOOGLE = 'Google',
	TWITCH = 'Twitch',
	EMAIL = 'Email'
}

export enum UserTypes {
	ADMIN = 'Admin',
	GAMER = 'Gamer',
	FAN = 'Fan'
}

export interface TypedRequest<T> extends NextApiRequest {
	body: T
}

export interface TypedResponse<T> extends NextApiResponse {
	json: Send<T, this>
}

// TODO: Update ref types
export type OwnedCoin = {
	coinRef: Record<string, any>
	quantity: number
}

// TODO: Update dates to FB timestamps
export type RPXUser = {
	id?: string
	clerkId: string
	firstName: string
	lastName: string
	signupMethod: SignupMethods
	userType: UserTypes
	createdAt: Date | string
	updatedAt: Date | string
	ownedCoins: OwnedCoin[]
	walletFunds: number
	lastSignInAt: Date | string
}

export type NewUser = {
	id?: string
	clerkId: string
	firstName: string
	lastName: string
	signupMethod: OAuthProvider | string // TODO: Extend
	userType: UserTypes
	walletFunds: number
	createdAt: Date | string
	updatedAt: Date | string
	lastSignInAt: Date | string
}

export type Coin = {
	id?: string
	name: string
	creatorName: string
	creatorRef?: Record<string, any>
	description?: string
	imageUrl?: string
	currentPrice: number
	previousPrice: number
	amountMinted: number
	amountPurchased: number
	createdAt: Date | string
	updatedAt: Date | string
}

// Utility types

export type Maybe<T> = T | null
