import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  //Data Type:
  // Set, Map

  #videos = new Map();

  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return {
          id,
          ...data,
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  getById(id) {
    return this.#videos.get(id);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
