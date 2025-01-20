--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: delivery_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_data (
    order_id text NOT NULL,
    agent_age integer,
    agent_rating double precision,
    store_latitude double precision,
    store_longitude double precision,
    drop_latitude double precision,
    drop_longitude double precision,
    order_date date,
    order_time time without time zone,
    pickup_time time without time zone,
    weather text,
    traffic text,
    vehicle text,
    area text,
    delivery_time integer,
    category text
);


ALTER TABLE public.delivery_data OWNER TO postgres;

--
-- Name: delivery_data delivery_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_data
    ADD CONSTRAINT delivery_data_pkey PRIMARY KEY (order_id);


--
-- PostgreSQL database dump complete
--

