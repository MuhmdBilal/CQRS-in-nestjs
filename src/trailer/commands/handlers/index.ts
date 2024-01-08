import {TrailerCreatedHandler} from "./trailer.create.handler"
import {DeleteTrailerHandler} from "./trailer.delete.handler"
import {TrailerUpdateHandler} from "./trailer.update.handler"

export const CommandHandlers = [TrailerCreatedHandler, DeleteTrailerHandler, TrailerUpdateHandler]