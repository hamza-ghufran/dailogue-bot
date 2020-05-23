module.exports = (table) => {
    table.increments('id')
        .primary()

    table.string('user_id')
        .references('id')
        .inTable('user')

    table.string('request')
    table.string('response')

    table.timestamp('created_at')

    table.boolean('active')
        .defaultTo(true)

    table.boolean('archive')
        .defaultTo(false)
}