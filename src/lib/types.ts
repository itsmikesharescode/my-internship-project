

//data type for supabase repo_tb
export type Repos = {
    id: number
    uid: string
    created_at: string
    unit_img: string
    unit_name: string
    seller_contact_num: string
    unit_condition: string
    img_path: string
}

//data type for supabase branch_tb
export type Branches = {
    id: number
    uid: string
    created_at: string
    branch_img_url: string
    branch_row_one_header_name: string
    branch_lat: number
    branch_long: number
    branch_row_two_header_name_f: string
    branch_address: string
    branch_address_gps_link: string
    branch_mob_num: string
    branch_fb_link: string
    branch_email: string
    branch_row_two_header_name_s: string
    branch_url: string
}

//data type for supabase chats_tb
export type Chats = {
    id: number
    created_at: string
    origin_uid: string
    email: string
    host_chat: string
    host_name: string
}

//data type for supabase created_users_tb
export type UsersList = {
    id: number
    created_at: string
    users_uid: string
    full_name: string
    address: string
}

//data type for dynamic search
export interface SearchModel <T extends Record<PropertyKey, any>> {
    data: T[]
    filtered: T[]
    search: string
}

export type WebPages = {
    url: string
    title: string
    content: string
    documentInfo: string
    searchPattern?: string
}