/*
 Navicat Premium Data Transfer

 Source Server         : docker-postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 130000
 Source Host           : localhost:5432
 Source Catalog        : db_test
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130000
 File Encoding         : 65001

 Date: 01/04/2021 18:41:54
*/


-- ----------------------------
-- Sequence structure for casbin_rule_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."casbin_rule_id_seq1";
CREATE SEQUENCE "public"."casbin_rule_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."casbin_rule_id_seq1" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for role_menu_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."role_menu_id_seq";
CREATE SEQUENCE "public"."role_menu_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."role_menu_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for sys_setting_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sys_setting_id_seq";
CREATE SEQUENCE "public"."sys_setting_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."sys_setting_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for user_extend_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_extend_id_seq";
CREATE SEQUENCE "public"."user_extend_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."user_extend_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for casbin_rule
-- ----------------------------
DROP TABLE IF EXISTS "public"."casbin_rule";
CREATE TABLE "public"."casbin_rule" (
  "id" int4 NOT NULL DEFAULT nextval('casbin_rule_id_seq1'::regclass),
  "ptype" varchar(255) COLLATE "pg_catalog"."default",
  "v0" varchar(255) COLLATE "pg_catalog"."default",
  "v1" varchar(255) COLLATE "pg_catalog"."default",
  "v2" varchar(255) COLLATE "pg_catalog"."default",
  "v3" varchar(255) COLLATE "pg_catalog"."default",
  "v4" varchar(255) COLLATE "pg_catalog"."default",
  "v5" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."casbin_rule" OWNER TO "postgres";
COMMENT ON COLUMN "public"."casbin_rule"."ptype" IS 'p: 表示角色 - 权限 - 访问方式; g: 表示用户 - 角色';
COMMENT ON TABLE "public"."casbin_rule" IS '规则表';

-- ----------------------------
-- Records of casbin_rule
-- ----------------------------
BEGIN;
INSERT INTO "public"."casbin_rule" VALUES (1, 'g', 'USER2Xba87p_KiZ', 'ROLEc0zY5dW7LZK', NULL, NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (370, 'p', 'ROLEc0zY5dW7LZK', '/api/user', 'POST', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (371, 'p', 'ROLEc0zY5dW7LZK', '/api/user', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (372, 'p', 'ROLEc0zY5dW7LZK', '/api/user', 'PUT', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (373, 'p', 'ROLEc0zY5dW7LZK', '/api/user', 'DELETE', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (374, 'p', 'ROLEc0zY5dW7LZK', '/api/menu', 'PUT', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (375, 'p', 'ROLEc0zY5dW7LZK', '/api/menu', 'DELETE', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (376, 'p', 'ROLEc0zY5dW7LZK', '/api/menu/tree', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (377, 'p', 'ROLEc0zY5dW7LZK', '/api/menu', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (378, 'p', 'ROLEc0zY5dW7LZK', '/api/system/config', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (379, 'p', 'ROLEc0zY5dW7LZK', '/api/menu', 'POST', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (380, 'p', 'ROLEc0zY5dW7LZK', '/api/role', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (381, 'p', 'ROLEc0zY5dW7LZK', '/api/role', 'PUT', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (382, 'p', 'ROLEc0zY5dW7LZK', '/api/role', 'DELETE', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (383, 'p', 'ROLEc0zY5dW7LZK', '/api/role', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (384, 'p', 'ROLEc0zY5dW7LZK', '/api/role/:id', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (385, 'p', 'ROLEUUx4QeWokk2', '/api/user', 'POST', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (386, 'p', 'ROLEUUx4QeWokk2', '/api/user', 'GET', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (387, 'p', 'ROLEUUx4QeWokk2', '/api/user', 'PUT', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (388, 'p', 'ROLEUUx4QeWokk2', '/api/user', 'DELETE', NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (389, 'g', 'USER-dSYDXObUh1', 'ROLEUUx4QeWokk2', NULL, NULL, NULL, NULL);
INSERT INTO "public"."casbin_rule" VALUES (390, 'g', 'USERdNK3cQNxDiX', 'ROLER-JFQIbKMAj', NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."menu";
CREATE TABLE "public"."menu" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" varchar(255) COLLATE "pg_catalog"."default",
  "remarks" varchar(255) COLLATE "pg_catalog"."default",
  "icon" varchar(255) COLLATE "pg_catalog"."default",
  "menu_type" int4 DEFAULT 0,
  "sort" int4,
  "path" varchar(255) COLLATE "pg_catalog"."default" DEFAULT ''::character varying,
  "hidden" bool DEFAULT true,
  "permission" varchar(255) COLLATE "pg_catalog"."default",
  "component" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8,
  "operate_type" varchar(255) COLLATE "pg_catalog"."default" DEFAULT '*'::character varying
)
;
ALTER TABLE "public"."menu" OWNER TO "postgres";
COMMENT ON COLUMN "public"."menu"."id" IS '菜单id';
COMMENT ON COLUMN "public"."menu"."title" IS '菜单名';
COMMENT ON COLUMN "public"."menu"."parent_id" IS '上级菜单ID';
COMMENT ON COLUMN "public"."menu"."remarks" IS '备注';
COMMENT ON COLUMN "public"."menu"."icon" IS 'icon';
COMMENT ON COLUMN "public"."menu"."menu_type" IS '菜单类型 0:目录 1:菜单 2: 按钮';
COMMENT ON COLUMN "public"."menu"."sort" IS '排序值';
COMMENT ON COLUMN "public"."menu"."path" IS 'path地址';
COMMENT ON COLUMN "public"."menu"."hidden" IS '菜单隐藏 false 显示，true 不显示';
COMMENT ON COLUMN "public"."menu"."permission" IS '权限标识';
COMMENT ON COLUMN "public"."menu"."component" IS '组件地址';
COMMENT ON COLUMN "public"."menu"."name" IS '组件名';
COMMENT ON COLUMN "public"."menu"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."menu"."updated_at" IS '更新日期';
COMMENT ON COLUMN "public"."menu"."operate_type" IS '操作类型：* GET POST DELETE PUT';
COMMENT ON TABLE "public"."menu" IS '菜单表';

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO "public"."menu" VALUES ('MENU_8FzwwYbQDs', '配置列表', 'MENUb0nC7xhjwn2', NULL, NULL, 2, 110, NULL, 't', '/api/system/config', NULL, NULL, 1616556476265, 1616556476265, 'GET');
INSERT INTO "public"."menu" VALUES ('MENUnHKatnmsHVe', '用户管理', 'MENUlfWBuZUNR4s', NULL, 'user', 1, 20, 'user', 'f', '', 'system/user/index', 'User', 1614850084407, 1615455721617, '*');
INSERT INTO "public"."menu" VALUES ('MENUgqzb1TFNy1P', '菜单管理', 'MENUlfWBuZUNR4s', NULL, 'menu', 1, 20, 'menu', 'f', '', 'system/menu/index', 'Menu', 1614850487504, 1615457838322, '*');
INSERT INTO "public"."menu" VALUES ('MENUlfWBuZUNR4s', '系统管理', '0', NULL, 'system', 0, 2, '/system', 'f', '', NULL, NULL, 1614849855810, 1615800733750, '*');
INSERT INTO "public"."menu" VALUES ('MENUjW-OpLmcUX3', '新增角色', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 100, NULL, 't', '/api/role', NULL, NULL, 1615521513695, 1615521513695, 'GET');
INSERT INTO "public"."menu" VALUES ('MENU-SCEmzTLoR0', '修改角色基本信息', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 101, NULL, 't', '/api/role', NULL, NULL, 1615521548156, 1615521548156, 'PUT');
INSERT INTO "public"."menu" VALUES ('MENUV4uz-UxR6wX', '删除角色', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 103, NULL, 't', '/api/role', NULL, NULL, 1615521631986, 1615521631986, 'DELETE');
INSERT INTO "public"."menu" VALUES ('MENUGeuKUrVJ9fY', '角色分页列表', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 104, NULL, 't', '/api/role', NULL, NULL, 1615521769168, 1615521769168, 'GET');
INSERT INTO "public"."menu" VALUES ('MENUD6P4c1pwpzh', '单个角色信息', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 106, NULL, 't', '/api/role/:id', NULL, NULL, 1615522123481, 1615522123481, 'GET');
INSERT INTO "public"."menu" VALUES ('MENUcmfU69h-Ezk', '用户修改', 'MENUnHKatnmsHVe', NULL, NULL, 2, 200, NULL, 't', '/api/user', NULL, NULL, 1615522195227, 1615522195227, 'PUT');
INSERT INTO "public"."menu" VALUES ('MENUhhmiPWGUPAm', '用户删除', 'MENUnHKatnmsHVe', NULL, NULL, 2, 201, NULL, 't', '/api/user', NULL, NULL, 1615522232937, 1615522232937, 'DELETE');
INSERT INTO "public"."menu" VALUES ('MENUlfWBuZGNR4s', '角色管理', 'MENUlfWBuZUNR4s', NULL, 'role', 1, 21, 'role', 'f', NULL, 'system/role/index', 'Role', 1614849855810, 1616468349643, '*');
INSERT INTO "public"."menu" VALUES ('MENUb0nC7xhjwn2', '系统配置', 'MENUlfWBuZUNR4s', NULL, 'backup', 1, 100, 'config', 'f', NULL, 'system/config/index', 'Config', 1616556419364, 1616582238860, '*');
INSERT INTO "public"."menu" VALUES ('MENUlK6iTYaWH0h', '菜单修改', 'MENUgqzb1TFNy1P', NULL, NULL, 2, 300, NULL, 't', '/api/menu', NULL, NULL, 1615522346844, 1615522346844, 'PUT');
INSERT INTO "public"."menu" VALUES ('MENUMhjIyjxi6Ic', '菜单删除', 'MENUgqzb1TFNy1P', NULL, NULL, 2, 301, NULL, 't', '/api/menu', NULL, NULL, 1615522376485, 1615522376485, 'DELETE');
INSERT INTO "public"."menu" VALUES ('MENU1M7_8KY_87N', '菜单树状结构', 'MENUgqzb1TFNy1P', NULL, NULL, 2, 303, NULL, 't', '/api/menu/tree', NULL, NULL, 1615522445633, 1615522445633, 'GET');
INSERT INTO "public"."menu" VALUES ('MENU_lPQyQqF6oj', '菜单列表(树状)', 'MENUgqzb1TFNy1P', NULL, NULL, 2, 304, NULL, 't', '/api/menu', NULL, NULL, 1615522497256, 1615522497256, 'GET');
INSERT INTO "public"."menu" VALUES ('MENUaCn0K9QzPFg', '获取所有角色信息', 'MENUlfWBuZGNR4s', NULL, NULL, 2, 305, NULL, 't', '/api/role/all', NULL, NULL, 1615803967347, 1615803967347, 'GET');
INSERT INTO "public"."menu" VALUES ('MENUCHzCIz_K8_G', '用户列表', 'MENUnHKatnmsHVe', NULL, '', 2, 20, NULL, 't', '/api/user', '', NULL, 1614850355468, 1615455018124, 'GET');
INSERT INTO "public"."menu" VALUES ('MENU91vDcDrY95g', '菜单新增', 'MENUgqzb1TFNy1P', NULL, '', 2, 20, NULL, 't', '/api/menu', '', NULL, 1614850547274, 1615457858157, 'POST');
INSERT INTO "public"."menu" VALUES ('MENUY53O19zkmvv', '用户新增', 'MENUnHKatnmsHVe', NULL, '', 2, 20, NULL, 't', '/api/user', '', NULL, 1614850228700, 1614850228700, 'POST');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS "public"."role";
CREATE TABLE "public"."role" (
  "id" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "sort" int4,
  "level" int4 DEFAULT 1,
  "created_at" int8,
  "updated_at" int8,
  "enabled" bool DEFAULT true,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "parent_id" varchar(255) COLLATE "pg_catalog"."default" DEFAULT 0
)
;
ALTER TABLE "public"."role" OWNER TO "postgres";
COMMENT ON COLUMN "public"."role"."id" IS '角色唯一id';
COMMENT ON COLUMN "public"."role"."sort" IS '排序值';
COMMENT ON COLUMN "public"."role"."level" IS '角色等级 0:超级 1:普通';
COMMENT ON COLUMN "public"."role"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."role"."updated_at" IS '更新日期';
COMMENT ON COLUMN "public"."role"."enabled" IS '状态 true: 启用 false: 禁用';
COMMENT ON COLUMN "public"."role"."description" IS '描述';
COMMENT ON COLUMN "public"."role"."parent_id" IS '角色父级id';
COMMENT ON TABLE "public"."role" IS '角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO "public"."role" VALUES ('ROLEc0zY5dW7LZK', '超级管理员', 1, 0, 1614680550802, 1614680550802, 't', '超级管理员', '0');
INSERT INTO "public"."role" VALUES ('ROLEUUx4QeWokk2', '普通管理员', 2, 1, 1614680550802, 1615368528118, 't', '普通管理员', '0');
INSERT INTO "public"."role" VALUES ('ROLER-JFQIbKMAj', '普通用户', NULL, 2, 1615369033973, 1617273396446, 't', '普通用户', '0');
COMMIT;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."role_menu";
CREATE TABLE "public"."role_menu" (
  "id" int4 NOT NULL DEFAULT nextval('role_menu_id_seq'::regclass),
  "r_id" varchar(255) COLLATE "pg_catalog"."default",
  "m_id" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."role_menu" OWNER TO "postgres";
COMMENT ON COLUMN "public"."role_menu"."r_id" IS '角色唯一id';
COMMENT ON COLUMN "public"."role_menu"."m_id" IS '菜单唯一id';
COMMENT ON COLUMN "public"."role_menu"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."role_menu"."updated_at" IS '更新日期';
COMMENT ON TABLE "public"."role_menu" IS '角色菜单表';

-- ----------------------------
-- Records of role_menu
-- ----------------------------
BEGIN;
INSERT INTO "public"."role_menu" VALUES (448, 'ROLEc0zY5dW7LZK', 'MENUnHKatnmsHVe', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (449, 'ROLEc0zY5dW7LZK', 'MENUY53O19zkmvv', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (450, 'ROLEc0zY5dW7LZK', 'MENUCHzCIz_K8_G', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (451, 'ROLEc0zY5dW7LZK', 'MENUcmfU69h-Ezk', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (452, 'ROLEc0zY5dW7LZK', 'MENUhhmiPWGUPAm', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (453, 'ROLEc0zY5dW7LZK', 'MENUgqzb1TFNy1P', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (454, 'ROLEc0zY5dW7LZK', 'MENUlfWBuZUNR4s', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (455, 'ROLEc0zY5dW7LZK', 'MENUlK6iTYaWH0h', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (456, 'ROLEc0zY5dW7LZK', 'MENUMhjIyjxi6Ic', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (457, 'ROLEc0zY5dW7LZK', 'MENU1M7_8KY_87N', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (458, 'ROLEc0zY5dW7LZK', 'MENU_lPQyQqF6oj', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (459, 'ROLEc0zY5dW7LZK', 'MENUb0nC7xhjwn2', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (460, 'ROLEc0zY5dW7LZK', 'MENU_8FzwwYbQDs', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (461, 'ROLEc0zY5dW7LZK', 'MENU91vDcDrY95g', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (462, 'ROLEc0zY5dW7LZK', 'MENUlfWBuZGNR4s', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (463, 'ROLEc0zY5dW7LZK', 'MENUjW-OpLmcUX3', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (464, 'ROLEc0zY5dW7LZK', 'MENU-SCEmzTLoR0', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (465, 'ROLEc0zY5dW7LZK', 'MENUV4uz-UxR6wX', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (466, 'ROLEc0zY5dW7LZK', 'MENUGeuKUrVJ9fY', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (467, 'ROLEc0zY5dW7LZK', 'MENUD6P4c1pwpzh', 1617273352394, 1617273352394);
INSERT INTO "public"."role_menu" VALUES (468, 'ROLEUUx4QeWokk2', 'MENUnHKatnmsHVe', 1617273408419, 1617273408419);
INSERT INTO "public"."role_menu" VALUES (469, 'ROLEUUx4QeWokk2', 'MENUY53O19zkmvv', 1617273408419, 1617273408419);
INSERT INTO "public"."role_menu" VALUES (470, 'ROLEUUx4QeWokk2', 'MENUCHzCIz_K8_G', 1617273408419, 1617273408419);
INSERT INTO "public"."role_menu" VALUES (471, 'ROLEUUx4QeWokk2', 'MENUcmfU69h-Ezk', 1617273408419, 1617273408419);
INSERT INTO "public"."role_menu" VALUES (472, 'ROLEUUx4QeWokk2', 'MENUhhmiPWGUPAm', 1617273408419, 1617273408419);
INSERT INTO "public"."role_menu" VALUES (473, 'ROLEUUx4QeWokk2', 'MENUlfWBuZUNR4s', 1617273408419, 1617273408419);
COMMIT;

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS "public"."sys_config";
CREATE TABLE "public"."sys_config" (
  "id" int4 NOT NULL DEFAULT nextval('sys_setting_id_seq'::regclass),
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "value" text COLLATE "pg_catalog"."default" NOT NULL,
  "remark" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" int8,
  "updated_at" int8
)
;
ALTER TABLE "public"."sys_config" OWNER TO "postgres";
COMMENT ON COLUMN "public"."sys_config"."name" IS '配置名称';
COMMENT ON COLUMN "public"."sys_config"."value" IS '配置值';
COMMENT ON COLUMN "public"."sys_config"."remark" IS '配置说明';
COMMENT ON COLUMN "public"."sys_config"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."sys_config"."updated_at" IS '更新日期';
COMMENT ON TABLE "public"."sys_config" IS '系统设置表';

-- ----------------------------
-- Records of sys_config
-- ----------------------------
BEGIN;
INSERT INTO "public"."sys_config" VALUES (1, 'count', '2001', '次数', 1616581811187, 1616581811187);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(50) COLLATE "pg_catalog"."default",
  "password" varchar(100) COLLATE "pg_catalog"."default",
  "nick_name" varchar(50) COLLATE "pg_catalog"."default",
  "mobile" varchar(20) COLLATE "pg_catalog"."default",
  "email" varchar(20) COLLATE "pg_catalog"."default",
  "avatar" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8,
  "enabled" bool DEFAULT true,
  "creator" varchar(255) COLLATE "pg_catalog"."default",
  "modifier" varchar(255) COLLATE "pg_catalog"."default"
)
;
ALTER TABLE "public"."user" OWNER TO "postgres";
COMMENT ON COLUMN "public"."user"."id" IS '用户id';
COMMENT ON COLUMN "public"."user"."username" IS '用户名';
COMMENT ON COLUMN "public"."user"."password" IS '密码';
COMMENT ON COLUMN "public"."user"."nick_name" IS '用户昵称';
COMMENT ON COLUMN "public"."user"."mobile" IS '手机号';
COMMENT ON COLUMN "public"."user"."email" IS '邮箱';
COMMENT ON COLUMN "public"."user"."avatar" IS '头像';
COMMENT ON COLUMN "public"."user"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."user"."updated_at" IS '更新日期';
COMMENT ON COLUMN "public"."user"."enabled" IS '状态 true: 启用 false: 禁用';
COMMENT ON COLUMN "public"."user"."creator" IS '创建人';
COMMENT ON COLUMN "public"."user"."modifier" IS '修改人';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO "public"."user" VALUES ('USER2Xba87p_KiZ', 'admin', '$2a$10$MaQyzfV74l9xzseq9lRiZePvFkFgrmd7tL1ewz6RRnpvf7Rp4dh32', 'admin', '13086565662', '1273398724@qq.com', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 1614680550802, 1616495222437, 't', 'USER2Xba87p_KiZ', NULL);
INSERT INTO "public"."user" VALUES ('USER-dSYDXObUh1', 'lihua', '$2a$10$PqQaofhbmDk0viKIN9j94.k4crSZrUoObs47ip3EJ7E.F6JydqB72', '李华1', '13096565665', 'lihua@qq.com', NULL, 1615369985581, 1617273451926, 't', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ');
INSERT INTO "public"."user" VALUES ('USERdNK3cQNxDiX', 'lily', '$2a$10$MaQyzfV74l9xzseq9lRiZePvFkFgrmd7tL1ewz6RRnpvf7Rp4dh32', 'lily', '13086565667', '13086565667@qq.com', NULL, 1615804285073, 1617273460848, 't', 'USER-dSYDXObUh1', 'USER2Xba87p_KiZ');
COMMIT;

-- ----------------------------
-- Table structure for user_extend
-- ----------------------------
DROP TABLE IF EXISTS "public"."user_extend";
CREATE TABLE "public"."user_extend" (
  "id" int4 NOT NULL DEFAULT nextval('user_extend_id_seq'::regclass),
  "user_id" varchar(25) COLLATE "pg_catalog"."default",
  "extend_field" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "extend_value" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "creator" varchar(100) COLLATE "pg_catalog"."default",
  "modifier" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" int8,
  "updated_at" int8,
  "extend_extra" json
)
;
ALTER TABLE "public"."user_extend" OWNER TO "postgres";
COMMENT ON COLUMN "public"."user_extend"."user_id" IS '用户id';
COMMENT ON COLUMN "public"."user_extend"."extend_field" IS '拓展字段';
COMMENT ON COLUMN "public"."user_extend"."extend_value" IS '拓展字段值';
COMMENT ON COLUMN "public"."user_extend"."creator" IS '创建人';
COMMENT ON COLUMN "public"."user_extend"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."user_extend"."created_at" IS '创建日期';
COMMENT ON COLUMN "public"."user_extend"."updated_at" IS '更新日期';
COMMENT ON COLUMN "public"."user_extend"."extend_extra" IS '拓展字段值额外信息';

-- ----------------------------
-- Records of user_extend
-- ----------------------------
BEGIN;
INSERT INTO "public"."user_extend" VALUES (63, 'USERVSNZ9CkbVhs', 'access_key_id', 'JBRmV5rb0yXLy8aN', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617184635036, 1617184635036, '[]');
INSERT INTO "public"."user_extend" VALUES (64, 'USERWtM7niZifaW', 'access_key_id', 'JBR1zP7pEGJ0Ydgw', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617184653496, 1617184653496, '[]');
INSERT INTO "public"."user_extend" VALUES (67, 'USERjma8wLrE2F_', 'access_key_id', 'JBRMvWjoEDRLbxR5', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617186361340, 1617186361340, '[{"id":2,"accessKeyId":"JBRMvWjoEDRLbxR5","configType":1,"configContent":{"remainingTimes":100},"createdAt":null,"updatedAt":null}]');
INSERT INTO "public"."user_extend" VALUES (70, 'USER-dSYDXObUh1', 'access_key_id', 'JBRIZWNpI2u1U1pB', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617186530054, 1617186530054, '[{"id":1,"accessKeyId":"JBRIZWNpI2u1U1pB","configType":1,"configContent":{"remainingTimes":5},"createdAt":null,"updatedAt":null}]');
INSERT INTO "public"."user_extend" VALUES (69, 'USERdNK3cQNxDiX', 'access_key_id', 'JBRb3gnSzxRiMiF1', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617186488316, 1617186488316, '[{"id":1,"accessKeyId":"JBRIZWNpI2u1U1pB","configType":1,"configContent":{"remainingTimes":5},"createdAt":null,"updatedAt":null}]');
INSERT INTO "public"."user_extend" VALUES (68, 'USERdNK3cQNxDiX', 'access_key_id', 'JBRPiC4RYc5zAeFt', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617186488316, 1617186488316, '[{"id":1,"accessKeyId":"JBRIZWNpI2u1U1pB","configType":1,"configContent":{"remainingTimes":9},"createdAt":null,"updatedAt":null}]');
INSERT INTO "public"."user_extend" VALUES (58, 'USER2Xba87p_KiZ', 'access_key_id', 'JBR83wyG9JQEAk6x', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617184614922, 1617184614922, '[]');
INSERT INTO "public"."user_extend" VALUES (59, 'USERgzB2U_me927', 'access_key_id', 'JBRJyWVhvjf0NPQg', 'USER2Xba87p_KiZ', 'USER2Xba87p_KiZ', 1617184616745, 1617184616745, '[]');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."casbin_rule_id_seq1"
OWNED BY "public"."casbin_rule"."id";
SELECT setval('"public"."casbin_rule_id_seq1"', 391, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."role_menu_id_seq"
OWNED BY "public"."role_menu"."id";
SELECT setval('"public"."role_menu_id_seq"', 474, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sys_setting_id_seq"
OWNED BY "public"."sys_config"."id";
SELECT setval('"public"."sys_setting_id_seq"', 3, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_extend_id_seq"
OWNED BY "public"."user_extend"."id";
SELECT setval('"public"."user_extend_id_seq"', 72, true);

-- ----------------------------
-- Primary Key structure for table casbin_rule
-- ----------------------------
ALTER TABLE "public"."casbin_rule" ADD CONSTRAINT "casbin_rule_pkey1" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role
-- ----------------------------
ALTER TABLE "public"."role" ADD CONSTRAINT "role_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table role_menu
-- ----------------------------
ALTER TABLE "public"."role_menu" ADD CONSTRAINT "role_menu_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sys_config
-- ----------------------------
ALTER TABLE "public"."sys_config" ADD CONSTRAINT "sys_setting_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_username_key" UNIQUE ("username");
ALTER TABLE "public"."user" ADD CONSTRAINT "user_mobile_key" UNIQUE ("mobile");
ALTER TABLE "public"."user" ADD CONSTRAINT "user_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user_extend
-- ----------------------------
ALTER TABLE "public"."user_extend" ADD CONSTRAINT "user_extend_pkey" PRIMARY KEY ("id");
