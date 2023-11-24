import { EventEmitter } from "events"
import type { ITransactionOnNetwork } from "@multiversx/sdk-core"

export type VueErdEvents = {
    transaction: ITransactionOnNetwork
}

const EventBus = new EventEmitter()

export { EventBus }
