"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishService = void 0;
const data_source_1 = require("data-source");
const Dish_1 = require("model/Dish");
const dishRepo = data_source_1.AppDataSource.getRepository(Dish_1.default);
class DishService {
    async findAll() {
        let list = await dishRepo.find();
        let res = [];
        for (let i = 0; i < list.length; i++) {
            res.push({ id: list[i].id, name: list[i].name, price: list[i].price, image: list[i].image });
        }
        return res;
    }
    async findById(req, res) {
        let idFind = Number(req.params.id);
        let obj = await dishRepo.findOne({ where: { id: idFind } });
        if (obj == null)
            return {};
        return { id: obj.id, name: obj.name, price: obj.price, image: obj.image };
    }
    async add(req, res) {
        let { name, price } = req.body;
        let fileName = req.file?.filename;
        let save = new Dish_1.default(name, Number(price), "/dish/" + fileName, []);
        await dishRepo.save(save);
    }
}
exports.DishService = DishService;
//# sourceMappingURL=DishService.js.map