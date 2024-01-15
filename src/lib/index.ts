import type { Session, SupabaseClient } from "@supabase/supabase-js";

import {writable} from "svelte/store";
import type { Branches, Repos, Chats, UsersList, SearchModel, WebPages } from "./types";

//navigation store management
export const selections = writable([
    {
        title: "Home",
        url: "/",
        description: "Annapolis Finance Inc Home Page.",
    },

    {
        title: "Be Our Agent",
        url: "/Be-Our-Agent",
        description: "Annapolis Finance Inc Be Our Agent Website.",
    },

    {
        title: "Inquire Now",
        url: "/Inquire-Now",
        description: "Annapolis Finance Inc Inquire Now Landing Page.",
    },

    {
        title: "Talk With Us",
        url: "/Talk-With-Us/Login",
        description: "Annapolis Finance Inc Chat System Page.",
    },

    {
        title: "Locations",
        url: "/Locations",
        description: "Annapolis Finance Inc Locations Website.",
    },

    {
        title: "Loan",
        url: "/Loan",
        description: "Annapolis Finance Inc Loan and Repossessed Units Website.",
    },

])

export const activeItem = writable("");

export const sessionStore = writable<Session | null>();
export const supabaseStore = writable<SupabaseClient>();
export const showSeachRoute = writable(false);

export const createSearchStore = <T extends Record<PropertyKey, any>>(data: T[]) =>
{
    const {set, update, subscribe} = writable<SearchModel<T>>({
        data: data,
        filtered: data,
        search: "",
    })

    return {
        set,
        update,
        subscribe,
    }
}

export const searchHandler =<T extends Record<PropertyKey, any>> (store: SearchModel<T>) => 
{
    const searchTerm = store.search.toLowerCase() || "";
    store.filtered = store.data.filter( (item ) => {
        return item.searchPattern.toLowerCase().includes(searchTerm);
    })
}

export const websiteStore: WebPages[] = [
    {
        url: "/",
        title: "Annapolis Finance Inc.",
        content: "NEED CASH ?, LOAN NOW WITH YOUR OR/CR. WE OFFER LOW INTEREST RATES WITH THE BEST TERMS, MAASAHAN SA LAHAT NG PANGANGAILANGAN, SANGLA NOW, Sangla now ? click here, APPLY LOAN NOW, Apply loan now ? click here",
        documentInfo: "NEED CASH ? LOAN NOW WITH YOUR OR/CR. WE OFFER LOW INTEREST RATES WITH THE BEST TERMS, MAASAHAN SA LAHAT NG PANGANGAILANGAN."
    },

    {
        url: "/Be-Our-Agent",
        title: "Annapolis Finance Inc - Be Our Agent",
        content: "BE OUR LOAN AGENT, Join now! and earn more than 50k per month, JOIN OUR TEAM NOW, Be our agent? click here",
        documentInfo: "BE OUR LOAN AGENT, Join now! and earn more than 50k per month, Join now! and earn more than 50k per month, JOIN OUR TEAM NOW!."
    },

    {
        url: "/Be-Our-Agent/Loan-Agent-Form",
        title: "Annapolis Finance Inc - Be Our Agent - Application Form",
        content: "LOAN AGENT FORM, BE OUR LOAN AGENT, Join now! and earn more than 50k per month, Description, Work Anytime Anywhere, No Qualifications, With free orientation, With additional incetive, Contacts, Email:, mainannapolisfinance@gmail.com, Contact Number:, 09564280526, 09159592858, Job Locations, Unit 1508, 15th Floor, Jollibee Plaza Condominium, Junior Rd., Ortigas, Pasig City",
        documentInfo: "LOAN AGENT FORM, with step by step process of application form."
    },

    {
        url: "/Inquire-Now",
        title: "Annapolis Finance Inc - Inquire Now - Application Form",
        content: "NEED CASH ?, LOAN NOW WITH YOUR OR/CR. WE OFFER LOW INTEREST RATES WITH THE BEST TERMS, ",
        documentInfo: "Inquire application, form with step by step process of application form"
    },

    {
        url: "/Talk-With-Us/Login",
        title: "Annapolis Finance Inc - Login Chat System",
        content: "Login, Login to Annapolis Finance, Or sign in with, Email, Password, Sign In",
        documentInfo: "Want to talk with developers ? have any concern regarding this website ? login here now!"
    },

    {
        url: "/Talk-With-Us/Sign-Up",
        title: "Annapolis Finance Inc - Sign up Chat System",
        content: "Register, Sign up to Annapolis Finance, A code will be sent to your email address., Send Code, Password, Already have an account?",
        documentInfo: "Don't have an account yet? make one now!"
    },

    {
        url: "/Talk-With-Us/Forgot-Password",
        title: "Annapolis Finance Inc - Forgot Password Chat System",
        content: "Forgot Password, Recover Password to Annapolis Finance, An email containing a password reset link will be sent to your email., Already recovered?, Send Reset Link.",
        documentInfo: "Lost your password ? thats ok we offer a solution for that. Recover it now!"
    },

    {
        url: "/Locations",
        title: "Annapolis Finance Inc - Locations",
        content: "Browse to Annapolis Finance Inc. Locations.",
        documentInfo: "Browse to Annapolis Finance Inc. Locations? We have many branches soon!"
    },

    {
        url: "/Loan",
        title: "Annapolis Finance Inc - Loan",
        content: "Welcome to Loan Section What you are looking for ?, ORCR Loans are protected by an asset or property of value pledged by a borrower in exchange for a loan. These loans are most commonly used for car registrations and land titles., Sangla ORCR, Repossessed units refer to properties or items that were taken back by a lender or creditor due to non-payment by the borrower. This action typically occurs when the borrower defaults on a loan secured by the property or item., Repossessed Units",
        documentInfo: "Looking for repossessed units ? come have a look!"
    },


];

//loan store management
export const repos = writable<Repos[] | null>();
export const searchRepos = writable<Repos[] | null>();
export const showUpload = writable(false);
export const showUpdate = writable(0.1);

//locations store management
export const showLocUpload = writable(false);
export const branches = writable<Branches[] | null>();
export const renderSingleBranch = writable<Branches | null>(null);

//talk with us store management
export const chatStore = writable<Chats[] | null>();
export const usersList = writable<UsersList[] | null>();
export const targetID = writable("");