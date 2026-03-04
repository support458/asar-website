<?php
/**
 * send_to_chat.php
 *
 * 1. Возобновляет сессию пользователя.
 * 2. Вычисляет затраченное время на основе данных сессии.
 * 3. Отправляет результаты в Google Chat и делает редирект.
 */

// 1. Возобновляем сессию, чтобы получить доступ к времени старта
session_start();

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    die("Ошибка: доступ запрещен.");
}

$webhook_url = 'https://chat.googleapis.com/v1/spaces/AAQAoVEScO0/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=VNB5KxVdq22u9wnWMqx3CUMCL5EzJei-trlBuPRlq9c';

// 2. Вычисляем время на сервере
$startTime = isset($_SESSION['test_start_time']) ? $_SESSION['test_start_time'] : null;
$endTime = time();
$timeSpent = "Не удалось определить"; // Значение по умолчанию

if ($startTime) {
    $timeDiffSeconds = $endTime - $startTime;
    $minutes = floor($timeDiffSeconds / 60);
    $seconds = $timeDiffSeconds % 60;
    $timeSpent = "{$minutes} мин {$seconds} сек";
}

// Очищаем сессию после использования, чтобы тест нельзя было "переотправить"
unset($_SESSION['test_start_time']);

// Сбор остальных данных из формы
$fullName = isset($_POST['fullName']) ? htmlspecialchars($_POST['fullName']) : "Не указано";
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : "Не указан";
$isAutoSubmitted = isset($_POST['autosubmitted']);

// Динамический сбор ответов
$answer_widgets = []; 
foreach ($_POST as $key => $value) {
    if (strpos($key, 'q-') === 0) {
        $question_number = (int)str_replace('q-', '', $key) + 1;
        $answer = is_array($value) ? implode(', ', array_map('htmlspecialchars', $value)) : htmlspecialchars($value);
        if (!empty($answer)) {
            $answer_widgets[] = ['decoratedText' => ['topLabel' => 'Вопрос ' . $question_number, 'text' => $answer]];
        }
    }
}
if (empty($answer_widgets)) {
    $answer_widgets[] = ['textParagraph' => ['text' => '<i>Пользователь не ответил ни на один вопрос.</i>']];
}

// Формирование карточки
$subtitle = 'С сайта asar.consulting';
if ($isAutoSubmitted) {
    $subtitle .= ' (отправлено автоматически при выходе/обновлении)';
}

$card_data = [
    'cardsV2' => [[
        'cardId' => 'quizResultCard-' . time(),
        'card' => [
            'header' => ['title' => '🎉 Новый результат теста!', 'subtitle' => $subtitle, 'imageUrl' => 'https://cdn-icons-png.flaticon.com/512/2921/2921110.png', 'imageType' => 'CIRCLE'],
            'sections' => [
                [
                    'header' => 'Данные пользователя',
                    'widgets' => [
                        ['decoratedText' => ['topLabel' => 'ФИО', 'text' => $fullName]],
                        ['decoratedText' => ['topLabel' => 'Телефон', 'text' => $phone]],
                        ['decoratedText' => ['topLabel' => 'Затраченное время (сервер)', 'text' => $timeSpent]]
                    ]
                ],
                [
                    'header' => 'Ответы на вопросы',
                    'widgets' => $answer_widgets
                ]
            ]
        ]
    ]]
];
$json_data = json_encode($card_data);

// Отправка данных
$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Перенаправление
if ($http_code == 200) {
    header('Location: index.html?status=success');
    exit();
} else {
    header('Location: index.html?status=error');
    exit();
}
?>