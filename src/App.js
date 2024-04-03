import React, { useState } from 'react';

function FormWithState() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.name || !formData.username || !formData.email) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setError('');

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки формы');
      }

      console.log('Форма успешно отправлена');
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div>
      <h2>Форма с использованием useState</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Фамилия:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Номер телефона:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Веб-сайт:</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FormWithState;
