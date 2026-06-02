import { Repository } from "unchain";

export const posts = new Repository();

posts.create({ description: "Hello world!" });
posts.create({ description: "Happy new year!" });
posts.create({ description: "Unchain The Code!" });
