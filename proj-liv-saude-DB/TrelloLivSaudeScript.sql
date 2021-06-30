--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2021-06-29 21:18:58

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
-- TOC entry 203 (class 1259 OID 16411)
-- Name: card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.card (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    "listaId" integer NOT NULL
);


ALTER TABLE public.card OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16409)
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_id_seq OWNER TO postgres;

--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 202
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;


--
-- TOC entry 201 (class 1259 OID 16403)
-- Name: lista; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lista (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL
);


ALTER TABLE public.lista OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16401)
-- Name: lista_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lista_id_seq OWNER TO postgres;

--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 200
-- Name: lista_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lista_id_seq OWNED BY public.lista.id;


--
-- TOC entry 2857 (class 2604 OID 16414)
-- Name: card id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- TOC entry 2856 (class 2604 OID 16406)
-- Name: lista id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista ALTER COLUMN id SET DEFAULT nextval('public.lista_id_seq'::regclass);


--
-- TOC entry 2861 (class 2606 OID 16416)
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id, "listaId");


--
-- TOC entry 2859 (class 2606 OID 16408)
-- Name: lista lista_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lista
    ADD CONSTRAINT lista_pkey PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 16417)
-- Name: card listaId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT "listaId" FOREIGN KEY ("listaId") REFERENCES public.lista(id) ON DELETE CASCADE;


-- Completed on 2021-06-29 21:18:58

--
-- PostgreSQL database dump complete
--

