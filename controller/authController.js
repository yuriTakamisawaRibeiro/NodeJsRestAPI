const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cpfValidator = require('cpf-cnpj-validator').default;

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const validateCpf = (cpf) => {
    return cpfValidator.isValid(cpf);
}

const signup = async (req, res, next) => {
    const body = req.body;

    if (!['1', '2'].includes(body.userType)) {
        return res.status(400).json({
            status: 'fail',
            message: 'User Type inválido'
        });
    }

    try {

        if (!validateCpf(body.cpf)) {
            return res.status(400).json({
                status: 'fail',
                message: 'CPF inválido.'
            });
        }
        
        // Criando o novo usuário e esperando a promessa ser resolvida
        const hashedPassword = await bcrypt.hash(body.password, 10); // Criptografa a senha
        const newUser = await user.create({
            userType: body.userType,
            name: body.name,
            email: body.email,
            cpf: body.cpf,
            password: hashedPassword // Armazena a senha criptografada
        });

        // Convertendo o modelo criado em JSON
        const result = newUser.toJSON();

        delete result.password;
        delete result.deletedAt;

        result.token = generateToken({
            id: result.id
        });

        return res.status(201).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: 'Erro ao criar usuário.'
        });
    }
};

const updateUser = async (req, res, next) => {
    const { id } = req.params; // Obtém o ID do usuário a partir dos parâmetros da requisição
    const body = req.body; // Obtém os novos dados do corpo da requisição

    try {
        // Verifica se o usuário existe antes de tentar atualizá-lo
        const existingUser = await user.findByPk(id);
        if (!existingUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'Usuário não encontrado.'
            });
        }

        // Prepara os campos para atualização
        let fieldsToUpdate = {};
        const updateableFields = ['name', 'email', 'password'];

        updateableFields.forEach(field => {
            if (body[field]) {
                fieldsToUpdate[field] = body[field];
            }
        });

        // Atualiza o usuário no banco de dados
        const updatedUser = await user.update(fieldsToUpdate, { where: { id: id } });

        if (updatedUser[0] === 1) {
            // Retorna os dados atualizados do usuário
            const updatedResult = await user.findByPk(id);
            delete updatedResult.password; // Remover a senha do resultado para segurança
            return res.status(200).json({
                status: 'success',
                data: updatedResult
            });
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Erro ao atualizar o usuário.'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Erro interno do servidor.'
        });
    }
};


const deleteUser = async (req, res, next) => {
    const { id } = req.params; // Obtém o ID do usuário a partir dos parâmetros da requisição

    try {
        // Verifica se o usuário existe antes de tentar excluí-lo
        const existingUser = await user.findByPk(id);
        if (!existingUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'Usuário não encontrado.'
            });
        }

        // Deleta o usuário do banco de dados
        const deletedUser = await user.destroy({ where: { id: id } });

        if (deletedUser > 0) {
            return res.status(200).json({
                status: 'success',
                message: 'Usuário excluído com sucesso.'
            });
        } else {
            return res.status(500).json({
                status: 'fail',
                message: 'Erro ao excluir o usuário.'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Erro interno do servidor.'
        });
    }
};


const login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'Digite o email ou senha.'
        });
    }

    const result = await user.findOne({where: { email }});
    if(!result || !(await bcrypt.compare(password, result.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Email ou senha incorretos.'
        });
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: 'success',
        token,
    })


}



module.exports = { signup, login, deleteUser, updateUser };