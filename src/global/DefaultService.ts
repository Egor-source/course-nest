import {Repository} from "typeorm";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";

export abstract class DefaultService<T> {
    protected constructor(
        protected repository: Repository<T>
    ) {
    }

   public async paginate(paginate: PaginateInfoDto) {
       console.log(paginate)
        const [data, total] = await this.repository.findAndCount({
            take: paginate.count,
            skip: paginate.perPage * paginate.count,
        })
        return {
            data,
            total,
            currentPage: paginate.perPage,
        };
    }
}