import {Repository} from "typeorm";
import {PaginateInfoDto} from "../dto/PaginateInfoDto";

export abstract class DefaultService<T extends { id: number }> {
    protected constructor(
        protected repository: Repository<T>
    ) {
    }

    public async paginate(paginate: PaginateInfoDto) {
        const [data, total] = await this.repository.findAndCount({
            take: paginate.count,
            skip: paginate.perPage * paginate.count,
            order: {
                id: "DESC"
            } as any
        })
        return {
            data,
            total,
            currentPage: paginate.perPage,
        };
    }

    async remove(id: number) {
        await this.repository.delete(id);
        return {id}
    }
}