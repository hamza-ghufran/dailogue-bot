module.exports = (table) => {
    table.increments('id')
        .primary()

    table.string('user_id')

    table.string('name')
    table.string('password')
    table.string('email')
    table.string('dob')

    table.timestamp('created_at')
    table.boolean('active')
        //.notNullable()
        .defaultTo(true)

    table.boolean('archive')
        //.notNullable()
        .defaultTo(false)
}