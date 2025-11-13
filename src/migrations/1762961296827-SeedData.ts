import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1762961296827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "usuario" ("id", "sub", "nombre", "apellido", "dni", "numero", "correo", "habilitado", "id_tipo_usuario") VALUES
(1, '102709326430535603042', 'FUNNY', 'VALENTINE', NULL, NULL, 'funnyvalentineofi@gmail.com', 't', 1),
(2, '115149424468422488190', 'JEFERSON', 'J.', NULL, NULL, 'jeferjqc@gmail.com', 't', 2);

INSERT INTO "carrito" ("id", "updated_at", "id_usuario") VALUES
(1, '2025-11-11 07:58:26.683', 1),
(2, '2025-11-11 10:55:25.905', 2);

INSERT INTO "pedido" ("id", "codigo", "fecha", "hora", "total", "direccion", "ultima_fecha", "id_estado_pedido", "id_tipo_entrega", "id_metodo_pago", "id_usuario", "subtotal", "delivery_costo") VALUES
(1, '23dd6299-6c65-4f06-a2c3-ff3e4fcb5085', '2025-11-11', '10:03:23', 1139.00, '(-13.16799897682505,-74.21733498573305)', '2025-11-14', 4, 2, 2, 2, 1139.00, 0.00);

INSERT INTO "comprobante" ("id", "id_tipo_comprobante", "id_pedido", "ruc", "razon_social", "dni", "nombres") VALUES
(1, 1, 1, NULL, NULL, '76326472', 'vdfv fvdfv');

INSERT INTO "publicacion" ("id", "titulo", "url_redireccion", "public_id", "secure_url") VALUES
(1, 'TIENDA', 'HTTPS://WWW.FACEBOOK.COM/LACUSPERU/?LOCALE=ES_LA', 'publication/u9gpnsmoynp3xwj2pmol', 'https://res.cloudinary.com/valentine1234/image/upload/v1762873256/publication/u9gpnsmoynp3xwj2pmol.webp');

INSERT INTO "categoria" ("id", "nombre", "habilitado", "public_id", "secure_url") VALUES
(1, 'CUY', 't', 'category/m0ajfc35odhd0fdt7mnr', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866709/category/m0ajfc35odhd0fdt7mnr.webp'),
(2, 'GALLINAS', 't', 'category/jjokr1jbzmpilwjmpxev', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866726/category/jjokr1jbzmpilwjmpxev.webp'),
(3, 'CERDOS', 't', 'category/kfuheazbl3zyn9xhn4dt', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866739/category/kfuheazbl3zyn9xhn4dt.webp'),
(4, 'MAIZ', 't', 'category/crkpbjacu2gwfmelvz8x', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866807/category/crkpbjacu2gwfmelvz8x.webp'),
(5, 'VACUNOS', 't', 'category/nqhaqdnzxyddx4p1moh3', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866820/category/nqhaqdnzxyddx4p1moh3.webp'),
(6, 'AVES 2', 't', 'category/dcor6a5y5bzvw4alhg1a', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866830/category/dcor6a5y5bzvw4alhg1a.webp'),
(7, 'GALLOS DE PELEA', 't', 'category/w8txifluxgspeq9uoexd', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866845/category/w8txifluxgspeq9uoexd.webp'),
(8, 'CONEJOS', 't', 'category/z6xvrpm1dctfgsjeiwsh', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866861/category/z6xvrpm1dctfgsjeiwsh.webp'),
(9, 'VETERINARIO', 't', 'category/ebfg5qnaneud3d0jmvdy', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867060/category/ebfg5qnaneud3d0jmvdy.webp');

INSERT INTO "marca" ("id", "nombre", "habilitado", "public_id", "secure_url") VALUES
(1, 'RICOCAT', 't', 'brand/xxsmqwc83hgvogatwslf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867500/brand/xxsmqwc83hgvogatwslf.webp'),
(2, 'ALICORP', 't', 'brand/smhtqi6aaxoil0zs1eyg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867517/brand/smhtqi6aaxoil0zs1eyg.webp'),
(3, 'GAMAVET', 't', 'brand/hgg6daixb1mvhnnk78yj', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867530/brand/hgg6daixb1mvhnnk78yj.webp'),
(4, 'ALLIN', 't', 'brand/hvahuncrq3cwoo6ake6x', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867539/brand/hvahuncrq3cwoo6ake6x.webp'),
(5, 'AFERSA', 't', 'brand/e7yvqtuqgpr6cao5yldl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867565/brand/e7yvqtuqgpr6cao5yldl.webp'),
(6, 'BALANTECH', 't', 'brand/d2o1l8hbmjxqqis1jlzc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867591/brand/d2o1l8hbmjxqqis1jlzc.webp'),
(7, 'VITANOR', 't', 'brand/lkmfkdid6aunlw3spskg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870439/brand/lkmfkdid6aunlw3spskg.webp'),
(8, 'PURINA', 't', 'brand/f839zyuytwnr0thadbub', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870939/brand/f839zyuytwnr0thadbub.webp'),
(9, 'BEDOCE', 't', 'brand/mosv9q2syatxm7q5viba', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872209/brand/mosv9q2syatxm7q5viba.webp'),
(10, 'CORIMIX', 't', 'brand/vueyieo4rbvzfjwrvec5', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872471/brand/vueyieo4rbvzfjwrvec5.webp');

INSERT INTO "producto" ("id", "codigo", "nombre", "descripcion", "peso_kg", "precio", "habilitado", "porcentaje_descuento", "id_categoria", "id_marca") VALUES
(2, 'f6e60060-2421-47f0-afc4-4933a72af178', 'REPORDUCTOR CUYES RCUY *50', 'Descripción...', 50, 102, 't', 0, 1, 2),
(3, '37262c4d-0542-43c6-bee1-11dd70822b5a', 'REPORDUCTOR ANTI VIT', 'Descripción...', 50, 110, 't', 10, 1, 2),
(4, '933b008a-f493-4129-be76-fc59c617e821', 'INICIO CRCIMEINTO CUY', 'Descripción...', 50, 120, 't', 0, 1, 2),
(5, 'b81281e8-1aec-43f8-9eb4-5cd2f4505372', 'ENGORDE CUY ECUYMED', 'Descripción...', 50, 100, 't', 5, 1, 2),
(6, 'e2b6a06b-7189-4000-b60d-9a0b64f20c55', 'PRE INICIO POLLOS', 'Descripción...', 50, 100, 't', 0, 2, 6),
(7, 'a9c3675f-3c2b-41b4-9c73-5bd494e9e087', 'INICIO POLLO', 'Descripción...', 50, 115, 't', 0, 2, 6),
(8, 'e488d323-875c-429e-ae18-f4a5c0c8c8db', 'CRECIMINTO POLLO', 'Descripción...', 50, 110, 't', 0, 2, 6),
(9, 'ffc47bc8-84cb-4f42-b642-76663fb8f202', 'ENGORDE POLLO', 'Descripción...', 50, 109, 't', 0, 2, 6),
(10, 'fa570bc6-62b4-47f4-aaf7-2e0bb63568f2', 'PRE-POSTURA GALLINAS PG X 50 KG', 'Descripción...', 50, 105, 't', 0, 2, 6),
(11, '9f793a15-028f-4009-8e56-97bed3aed2ea', 'POSTURA GALLINA', 'Descripción...', 50, 107, 't', 0, 2, 6),
(12, '95704b6e-0b25-4801-8fce-b4d5b4220a7c', 'FASE 1/F1/LECHONES', 'Descripción...', 24, 154, 't', 0, 3, 2),
(13, 'd1827227-a748-477b-a160-ab757d20e7fc', 'INICIO CERDO', 'Descripción...', 50, 119, 't', 0, 3, 2),
(14, '5fb2d46a-6533-4ba3-b2fb-0b462af7f1c4', 'CRECIMIENTO CERDO', 'Descripción...', 50, 110, 't', 0, 3, 6),
(15, 'eb8c06a8-cba4-4d20-9e1d-be8d337bd3f9', 'ENGORDE CERDO', 'Descripción...', 50, 105, 't', 0, 3, 4),
(16, '7833d7db-dde6-440f-81cb-1dc598d82f83', 'GESTANTE CEDO', 'Descripción...', 50, 96, 't', 0, 3, 4),
(17, '10e4832f-e82b-4946-8309-ed77780c8914', 'LACTANCIA CERDO', 'Descripción...', 50, 107, 't', 0, 3, 4),
(18, '8041f55a-d41a-4b59-b3b9-1d297d7fdb03', 'MAIZ ENTERO', 'Descripción...', 50, 88, 't', 0, 4, 7),
(19, '139f283e-54c0-46a0-b42b-f9c71e4a6c1a', 'MAIZ PARTIDO', 'Descripción...', 50, 91, 't', 0, 4, 7),
(20, 'bb441074-0ba9-4d9c-b8bb-e165e86ca360', 'MAIZ REFINADA', 'Descripción...', 50, 91, 't', 0, 4, 7),
(21, '5ef1920f-3d4a-4e36-aab0-a03e25d91076', 'ENGORDE TORO', 'Descripción...', 50, 71, 't', 0, 5, 4),
(22, '2593670f-2baa-4a3d-9043-0f08ab0da709', 'VACAS LECHERAS LECHERINA', 'Descripción...', 50, 105, 't', 0, 5, 8),
(23, 'aa70bc49-67bb-4882-945b-a3cbd904d52f', 'TERNERAS CRECIMIENTO', 'Descripción...', 50, 104, 't', 0, 5, 8),
(24, '34701833-0ec8-4219-b284-70a38f7b2d02', 'INICIO PATO', 'Descripción...', 50, 114, 't', 0, 6, 8),
(25, 'e2b10038-ff59-4410-8af9-70826f741f90', 'CRECIMIENTO PATO', 'Descripción...', 50, 108, 't', 0, 6, 8),
(26, 'b355843f-0821-4905-b39e-a8228fc1bd80', 'INICIO PAVO', 'Descripción...', 50, 128, 't', 0, 6, 8),
(27, 'ce1e589a-6818-453d-a7b1-759d330a33e0', 'CRECIMIENTO PAVO', 'Descripción...', 50, 124, 't', 0, 6, 8),
(28, '949d4d3f-d74d-40c0-bdbd-8f31a2093378', 'ENGORDE PAVO', 'Descripción...', 50, 111, 't', 0, 6, 8),
(29, '4ff9440f-93ca-45e7-a304-3ad29aacf983', 'CRIADOR CRECIMIENTO GALLO DE PELEA', 'Descripción...', 40, 110, 't', 0, 7, 8),
(30, '04ba8723-7723-4333-8669-3e3efe383594', 'GALLO DE PELEA ALLIN', 'Descripción...', 50, 108, 't', 0, 7, 4),
(31, '10f18912-dd59-4b20-b21d-bd13c8b9ec5f', 'CONEJINA B12', 'Descripción...', 40, 107, 't', 0, 8, 8),
(32, '3de2d01c-1678-408d-b301-216d6bc24093', 'CONEPLUS BABY', 'Descripción...', 25, 78, 't', 0, 8, 9),
(33, '11651401-cf84-432f-8b5c-b154e2770ac5', 'CRIADOR CONEJO CORIMIX X 40 KG', 'Descripción...', 40, 102, 't', 0, 8, 10);

INSERT INTO "imagen_producto" ("id", "public_id", "secure_url", "id_producto") VALUES
(1, 'product/i4vvhyvvwlvemxkwsuzh', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868593/product/i4vvhyvvwlvemxkwsuzh.webp', 2),
(2, 'product/ynhuuqlfmw5oleujtb8n', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868758/product/ynhuuqlfmw5oleujtb8n.webp', 3),
(3, 'product/thsvgympr4x9wsjhvapz', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868936/product/thsvgympr4x9wsjhvapz.webp', 4),
(4, 'product/qctzh7cqtfcezqmi7trf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869052/product/qctzh7cqtfcezqmi7trf.webp', 5),
(5, 'product/n1sgy80jwswhikkqsrjg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869053/product/n1sgy80jwswhikkqsrjg.webp', 5),
(6, 'product/uapp1uluzgdqn39hio10', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869209/product/uapp1uluzgdqn39hio10.webp', 6),
(7, 'product/gzycazdtl7fwan2ocyfd', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869285/product/gzycazdtl7fwan2ocyfd.webp', 7),
(8, 'product/a0ugd0tlj4l0fzxkdx4i', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869374/product/a0ugd0tlj4l0fzxkdx4i.webp', 8),
(9, 'product/jmcrtzua6of6j9tcdvrv', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869379/product/jmcrtzua6of6j9tcdvrv.webp', 8),
(10, 'product/a6hqggupiybyb9b3bgdw', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869430/product/a6hqggupiybyb9b3bgdw.webp', 9),
(11, 'product/kwrklj5sxt26t5dd82ih', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869433/product/kwrklj5sxt26t5dd82ih.webp', 9),
(12, 'product/ljanvwjxe33sgehhstpc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869515/product/ljanvwjxe33sgehhstpc.webp', 10),
(13, 'product/zu3nyrawfzqlmg72bilm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869515/product/zu3nyrawfzqlmg72bilm.webp', 10),
(14, 'product/qvh1ctc1vvfjvvej4xdo', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869558/product/qvh1ctc1vvfjvvej4xdo.webp', 11),
(15, 'product/wwbgxtf12lzesj6r4z0z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869559/product/wwbgxtf12lzesj6r4z0z.webp', 11),
(16, 'product/l9nz6xqwovxwtoku0oei', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869651/product/l9nz6xqwovxwtoku0oei.webp', 12),
(17, 'product/dzfo1odbwuj9qgukh51f', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869656/product/dzfo1odbwuj9qgukh51f.webp', 12),
(18, 'product/mueef2nv3ya7fbpw4drl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869733/product/mueef2nv3ya7fbpw4drl.webp', 13),
(19, 'product/lv3jwthuh7cnrwn16ae4', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869959/product/lv3jwthuh7cnrwn16ae4.webp', 14),
(20, 'product/bcmqlr9uyefkcasm1qit', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870043/product/bcmqlr9uyefkcasm1qit.webp', 15),
(21, 'product/ieplwuzzyopw558pk4fm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870184/product/ieplwuzzyopw558pk4fm.webp', 16),
(22, 'product/dzqldrbjkvwypm1fgx4z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870237/product/dzqldrbjkvwypm1fgx4z.webp', 17),
(23, 'product/wuonpql2lnk4phvu4ztn', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870490/product/wuonpql2lnk4phvu4ztn.webp', 18),
(24, 'product/i2odawc69hioa2pfbnrs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870596/product/i2odawc69hioa2pfbnrs.webp', 19),
(25, 'product/szlanxl9jn61xehrstaf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870596/product/szlanxl9jn61xehrstaf.webp', 19),
(26, 'product/y9udknm7qzn2iqmfpwzq', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870667/product/y9udknm7qzn2iqmfpwzq.webp', 20),
(27, 'product/oh1rqdjwa1f0pfwmkbcw', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870671/product/oh1rqdjwa1f0pfwmkbcw.webp', 20),
(28, 'product/w1mcks2pyxsnyqxtcj7t', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870833/product/w1mcks2pyxsnyqxtcj7t.webp', 21),
(29, 'product/dc7gbdo4wr03f6lxzjgs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870833/product/dc7gbdo4wr03f6lxzjgs.webp', 21),
(30, 'product/fjlt3cjzh70ekvn8ljsx', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871129/product/fjlt3cjzh70ekvn8ljsx.webp', 23),
(31, 'product/fzyyld2nzmkzt0sehukn', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871132/product/fzyyld2nzmkzt0sehukn.webp', 23),
(32, 'product/kk66pd6rgdh0xhhbygh1', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871256/product/kk66pd6rgdh0xhhbygh1.webp', 24),
(33, 'product/c2vrkpfvj9ahjrj1xhqm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871334/product/c2vrkpfvj9ahjrj1xhqm.webp', 25),
(34, 'product/ce2sziwxjdsiihhuq6ck', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871414/product/ce2sziwxjdsiihhuq6ck.webp', 26),
(35, 'product/k6px40xc1ya70h7jhvp5', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871578/product/k6px40xc1ya70h7jhvp5.webp', 27),
(36, 'product/tyk6fvehi8mblyqsixgs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871646/product/tyk6fvehi8mblyqsixgs.webp', 28),
(37, 'product/epvbjpqgktlvattb3ai6', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871743/product/epvbjpqgktlvattb3ai6.webp', 29),
(38, 'product/njtiyw86qlb4cswwhvur', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871773/product/njtiyw86qlb4cswwhvur.webp', 29),
(39, 'product/h6yf0qfupurepvn36e6s', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871935/product/h6yf0qfupurepvn36e6s.webp', 30),
(40, 'product/ftqwijjtmxw3tas0exzb', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872082/product/ftqwijjtmxw3tas0exzb.webp', 31),
(41, 'product/al5yecyl1kpt2xv4ut8z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872251/product/al5yecyl1kpt2xv4ut8z.webp', 32),
(42, 'product/evgbp8eoleizss6u0zlc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872518/product/evgbp8eoleizss6u0zlc.webp', 33),
(43, 'product/lbez4mwlkinbo5768rvl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762875168/product/lbez4mwlkinbo5768rvl.webp', 22);
    
INSERT INTO "entrada" ("id", "fecha", "hora", "habilitado", "total") 
VALUES (1, '2025-11-11', '09:54:10', 't', 364);

INSERT INTO "detalle_entrada" ("id", "cantidad", "id_producto", "id_entrada") VALUES
(1, 7, 5, 1),
(2, 4, 3, 1),
(3, 19, 33, 1),
(4, 15, 32, 1),
(5, 14, 30, 1),
(6, 12, 31, 1),
(7, 12, 19, 1),
(8, 11, 20, 1),
(9, 12, 21, 1),
(10, 13, 23, 1),
(11, 14, 22, 1),
(12, 15, 24, 1),
(13, 16, 25, 1),
(14, 17, 26, 1),
(15, 18, 27, 1),
(16, 18, 29, 1),
(17, 13, 28, 1),
(18, 12, 13, 1),
(19, 11, 14, 1),
(20, 17, 15, 1),
(21, 18, 16, 1),
(22, 19, 17, 1),
(23, 1, 18, 1),
(24, 15, 7, 1),
(25, 12, 8, 1),
(26, 10, 6, 1),
(27, 19, 4, 1);

INSERT INTO "detalle_pedido" ("id", "precio", "cantidad", "subtotal", "id_producto", "id_pedido") VALUES
(1, 108.00, 1, 108.00, 30, 1),
(2, 107.00, 7, 749.00, 31, 1),
(3, 102.00, 2, 204.00, 33, 1),
(4, 78.00, 1, 78.00, 32, 1);
    
INSERT INTO "detalle_carrito" ("id", "cantidad", "id_producto", "id_carrito") VALUES
(6, 1, 32, 2),
(7, 1, 31, 2),
(8, 1, 30, 2),
(9, 1, 33, 2);

`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
             DELETE FROM "comprobante" WHERE "id" = 1;
        DELETE FROM "pedido" WHERE "id" = 1;
        DELETE FROM "carrito" WHERE "id" IN (1, 2);
        DELETE FROM "usuario" WHERE "id" IN (1, 2);
        DELETE FROM "publicacion" WHERE "id" = 1;
    DELETE FROM "categoria"
WHERE "id" BETWEEN 1 AND 9;

DELETE FROM "marca"
WHERE "id" BETWEEN 1 AND 10;

DELETE FROM "producto"
WHERE "id" BETWEEN 2 AND 33;


DELETE FROM "imagen_producto"
WHERE "id" BETWEEN 1 AND 43;

DELETE FROM "entrada" 
WHERE "id" = 1;

DELETE FROM "detalle_entrada"
WHERE "id" BETWEEN 1 AND 27;

DELETE FROM "detalle_pedido"
WHERE "id" BETWEEN 1 AND 4 ;

DELETE FROM "detalle_carrito" 
WHERE "id" BETWEEN 6 AND 9;

        `);
  }
}
