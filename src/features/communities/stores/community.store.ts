import { create } from "zustand"
import { SelectCommunity } from "../types/community.types";

type Store = {
    open: boolean
    toggleOpen: () => void
    community: SelectCommunity | null
    setCommunity: (community: SelectCommunity | null) => void
}

export const useCommunityStore = create<Store>(
    (set, get) => ({
        open: false,
        community: null,
        toggleOpen: () => {
            const oldState = get().open
            set({open: !oldState})
        },
        setCommunity: (community) => { 
            set({community})
        }
    })
)