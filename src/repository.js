/**
 * Simple in-memory data repository.
 */
export class Repository {
  constructor() {
    this.records = [];
    this.nextId = 1;
  }

  /**
   * Creates a new record.
   *
   * @param {Object} data
   * @returns {Object} Created record with generated id.
   */
  create(data) {
    const record = { ...data, id: this.nextId++ };
    this.records.push(record);
    return record;
  }

  /**
   * Finds a record by id.
   *
   * @param {number|string} id
   * @returns {Object|null}
   */
  readById(id) {
    return this.records.find((r) => r.id === Number(id)) || null;
  }

  /**
   * Finds all records matching query.
   *
   * @param {Object} query
   * @returns {Object[]}
   */
  where(query) {
    return this.records.filter((record) =>
      Object.entries(query).every(([key, value]) => record[key] === value),
    );
  }

  /**
   * Updates a record by id.
   *
   * @param {number|string} id
   * @param {Object} data
   * @returns {Object|null} Updated record or null if not found.
   */
  update(id, data) {
    const index = this.records.findIndex((r) => r.id === Number(id));
    if (index === -1) return null;
    this.records[index] = { ...this.records[index], ...data };
    return this.records[index];
  }

  /**
   * Deletes a record by id.
   *
   * @param {number|string} id
   * @returns {boolean} True if deleted, false if not found.
   */
  delete(id) {
    const index = this.records.findIndex((r) => r.id === Number(id));
    if (index === -1) return false;
    this.records.splice(index, 1);
    return true;
  }

  /**
   * Returns all records.
   *
   * @returns {Object[]}
   */
  all() {
    return [...this.records];
  }
}
