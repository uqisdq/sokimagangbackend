-- CRUD TABLES

--@block
CREATE TABLE coba/*${req.query.name}*/ (
                ID SERIAL PRIMARY KEY, /*Serial -> auti-incremented, gausah ngisi lagi*/
                filter varchar(255),
                imgSrc varchar(255),
                title varchar(255),
                summary varchar(255),
                galleryHref varchar(255)
            );

--@block
SELECT *
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema';

--@block
ALTER TABLE coba
ADD galleryTitle varchar(255);

--@block
SELECT
    table_name,
    column_name,
    data_type
FROM
    information_schema.COLUMNS
WHERE
    table_name = 'coba';

--@block
DROP TABLE coba

--@block
-- CRUD ROWS

--@block
INSERT INTO coba (filter,imgSrc,title,summary,galleryHref,galleryTitle)
VALUES /*Kalau mau nambah value, tinggal ketik di row baru dengan format sama)*/
    ('filter-app','assets/img/portfolio/DDLL-Poster.jpg','App 1','App','assets/img/portfolio/DDLL-Poster.jpg','App 1')
RETURNING id;
--@block
SELECT * FROM coba;

--@block
UPDATE coba
SET
    imgsrc ='assets/img/portfolio/curah_hujan.jpg',
    galleryHref = 'assets/img/portfolio/curah_hujan.jpg'
WHERE id = 1;

--@block
DELETE FROM coba WHERE id=2;