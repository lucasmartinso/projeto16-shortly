--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urlsUsers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."urlsUsers" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "urlId" integer NOT NULL
);


ALTER TABLE public."urlsUsers" OWNER TO postgres;

--
-- Name: urlsUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."urlsUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."urlsUsers_id_seq" OWNER TO postgres;

--
-- Name: urlsUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."urlsUsers_id_seq" OWNED BY public."urlsUsers".id;


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "urlId" integer NOT NULL,
    "countVisits" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.visits OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visits_id_seq OWNER TO postgres;

--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: urlsUsers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."urlsUsers" ALTER COLUMN id SET DEFAULT nextval('public."urlsUsers_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", token, "createdAt") FROM stdin;
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, url, "shortUrl", "createdAt") FROM stdin;
\.


--
-- Data for Name: urlsUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."urlsUsers" (id, "userId", "urlId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visits (id, "urlId", "countVisits") FROM stdin;
\.


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 1, false);


--
-- Name: urlsUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."urlsUsers_id_seq"', 1, false);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visits_id_seq', 1, false);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: urlsUsers urlsUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."urlsUsers"
    ADD CONSTRAINT "urlsUsers_pkey" PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urlsUsers urlsUsers_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."urlsUsers"
    ADD CONSTRAINT "urlsUsers_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- Name: urlsUsers urlsUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."urlsUsers"
    ADD CONSTRAINT "urlsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- PostgreSQL database dump complete
--

